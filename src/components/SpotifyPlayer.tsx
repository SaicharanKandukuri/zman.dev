import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI,
});

const SpotifyPlayer = () => {
  const [track, setTrack] = useState(null);
  const [progress, setProgress] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState('hsl(var(--background))');

  useEffect(() => {
    const fetchCurrentlyPlayingTrack = async () => {
      try {
        const data = await spotifyApi.getMyCurrentPlayingTrack();
        const track = data.body.item;
        setTrack(track);
        setProgress(data.body.progress_ms);

        const img = new Image();
        img.src = track.album.images[0].url;
        img.onload = () => {
          const colorThief = new ColorThief();
          const color = colorThief.getColor(img);
          setBackgroundColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
        };
      } catch (error) {
        console.error('Error fetching currently playing track:', error);
      }
    };

    fetchCurrentlyPlayingTrack();
    const interval = setInterval(fetchCurrentlyPlayingTrack, 10000);

    return () => clearInterval(interval);
  }, []);

  if (!track) {
    return null;
  }

  return (
    <div className="spotify-player" style={{ backgroundColor }}>
      <img src={track.album.images[0].url} alt={track.name} />
      <div>
        <h3>{track.name}</h3>
        <p>{track.artists.map(artist => artist.name).join(', ')}</p>
        <progress value={progress} max={track.duration_ms}></progress>
      </div>
    </div>
  );
};

export default SpotifyPlayer;
