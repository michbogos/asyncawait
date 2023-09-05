import './App.css';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL, fetchFile } from "@ffmpeg/util";
import { useEffect, useRef, useState } from 'react';
import { Grid, Button, Container, Input, Stack, Typography, Box } from '@mui/material';

function App() {
  const [loaded, setLoaded] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());
  const [video, setVideo] = useState(false);
  const [videoURL, setVideoURL] = useState(null);
  const [videoName, setVideoName] = useState(null);
  const [gifURL, setGifURL] = useState("");

  const convert = async () =>{
    console.log("before ffmpeg")
    const ffmpeg = ffmpegRef.current;
    await ffmpeg.writeFile(videoName, video)
    await ffmpeg.exec(["-i", videoName, "-t", "1.5", "-ss", "5.0", "-f", "gif", videoName.split(".")[0].concat(".gif")])
    const data = await ffmpeg.readFile(videoName.split(".")[0].concat(".gif"))
    setGifURL(URL.createObjectURL(new Blob([data.buffer], {type:"image/gif"})))
  }

  const load = async () => {
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd'
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on('log', ({ message }) => {
        console.log(message);
    });
    // toBlobURL is used to bypass CORS issue, urls with the same
    // domain can be used directly.
    await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    });
    setLoaded(true);
}

useEffect(()=>{
  load()
}, [])

  return (
      <Grid
      container
      spacing={1}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh' }}>
      <input id="fileInput" hidden type='file' accept='video/*'  onChange={(e)=>{setVideoURL(URL.createObjectURL(e.target.files[0]));fetchFile(e.target.files[0]).then((res)=>{setVideo(res);setVideoName(e.target.files[0].name)})}}></input>
          <Typography variant='h1'>Video to GIF</Typography>
          {loaded ? <h1>Loaded</h1> : <h1>Loading...</h1>}
          <Box width="10vw"><Button onClick={()=>{document.getElementById("fileInput").click()}} fullWidth variant='contained'>Select file</Button></Box>
          <h1>{videoName}</h1>
`       <Grid item xs={3}>
        <Stack direction="row">
          <video controls src={videoURL}></video>
          <img src ={gifURL}></img>
        </Stack>
        </Grid>
        <Grid item xs={3}>
          <Button disabled={video == null} variant='contained' onClick={convert}>Convert</Button>
        </Grid>
      </Grid>
  );
}

export default App;
