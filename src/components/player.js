import React,{ useState,useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight, faPlay,faPause} from "@fortawesome/free-solid-svg-icons";


const Player =({audioRef,currentSong, isPlaying, setIsPlaying,setSongInfo,songInfo,songs,setCurrentSong,setSongs }) => {
    //ref
// const audioRef=useRef(null);

useEffect(()=>{
    const newSongs = songs.map((song) =>{
        if(song.id===currentSong.id){
            return{
                ...song,
                active:true,
            };
        }else{
            return{
                ...song,
                active:false,
            };
        }
               });
               setSongs(newSongs)

},[currentSong]);
    //event handler
    const playSongHandler = () => {
      //  audioRef.current.play();
     if(isPlaying){
        audioRef.current.pause();
        setIsPlaying(!isPlaying);
     } else{

        audioRef.current.play();
        setIsPlaying(!isPlaying);
     }

    };

const getTime=(time) => {
return(
Math.floor(time / 60)+":"+("0"+ Math.floor(time%60)).slice(-2)

);

};

const dragHandler = (e)=>{
    audioRef.current.currentTime=e.target.value;
setSongInfo({...songInfo,currentTime:e.target.value})
};

const skipTrackHandler = (direction) =>{
let currentIndex=songs.findIndex((song)=> song.id===currentSong.id);
if(direction==='skip-forward'){
    setCurrentSong(songs[(currentIndex + 1) % songs.length])

}
if(direction==='skip-back'){
    if((currentIndex -1)%songs.length===-1){
        setCurrentSong(songs[songs.length-1]);
        return;

    }
    setCurrentSong(songs[(currentIndex - 1) % songs.length])

}
};

    //state
 
    return(
<div className="player">
    <div className="timecontrol">
      <p>{getTime(songInfo.currentTime)}</p>
      <input min={0}
       max={songInfo.duration || 0}
        value={songInfo.currentTime} 
       onChange={dragHandler} 
        type="range"/>
      <p>{getTime(songInfo.duration)}</p>  
    </div>

<div className="play-control">
<FontAwesomeIcon onClick={() => skipTrackHandler('skip-back')} className="skip-back" size="2x" icon={faAngleLeft}/>
<FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause: faPlay}/>
<FontAwesomeIcon onClick={() => skipTrackHandler('skip-forward')} className="skip-forward" size="2x" icon={faAngleRight}/>
</div>

</div>

    );
}

export default Player;