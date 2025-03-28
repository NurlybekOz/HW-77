import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectLoading, selectMessages} from "./MessagesSlice.ts";
import {useEffect} from "react";
import {fetchAllMessages} from "./MessagesThunk.ts";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {apiUrl} from "../../../globalConstants.ts";
import MessageForm from "../components/MessageForm.tsx";

const Messages = () => {
    const messages = useAppSelector(selectMessages)
    const loading= useAppSelector(selectLoading)
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(fetchAllMessages())
    }, [dispatch])

    return (

        (loading ? <Spinner/> :
         <>
             <MessageForm/>

            {messages.length === 0 ? <Typography variant='h4'>No messages yet..</Typography> :
            <Grid container spacing={2} direction='row'>
                {messages.map((message, index) => (
                        <Card sx={{ width: 345, minHeight: 200 }} key={index}>
                            <CardActionArea>
                                {message?.image ? <CardMedia
                                    component="img"
                                    height="140"
                                    image={message?.image ? apiUrl + '/' + message.image : undefined}
                                /> : null
                                }
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {message.author}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary', flexWrap: 'wrap' }}>
                                        {message.message}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                ))}
            </Grid>
            }
        </>
        )
    );
};

export default Messages;