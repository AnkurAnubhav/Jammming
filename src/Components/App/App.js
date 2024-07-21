import {React , useState} from 'react';
import styles from './App.module.css';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import {Spotify} from '../../util/Spotify';

function App() {

      const [searchResults, setSearchResults] = useState([
        {
            name: 'One Day',
            artist: 'G-Eazy',
            album: 'Freak Show',
            id: 1,
            uri: 'https://open.spotify.com/track/0mo6L5y8olr6HtK8kTGfBh'
        },
        {
            name: 'Lie',
            artist: 'Sasha Alex Sloan',
            album: 'Single',
            id: 2,
            uri: 'https://open.spotify.com/track/04NMWz4ctkuILV6mUR2iWp'
        },
        {
            name: 'Mask Off',
            artist: 'Future',
            album: 'Future',
            id: 3,
            uri: 'https://open.spotify.com/track/0VgkVdmE4gld66l8iyGjgx'
        },
        {
            name: 'Mask Offs',
            artist: 'Futures',
            album: 'Futures',
            id: 4,
            uri: 'https://open.spotify.com/track/0VgkVdmE4gld66l8iyGjgx'
        }
      ]);

      const [playlistName, setPlaylistName] = useState("Example Name");

      const [playlistTracks, setPlaylistTracks] = useState([
        {
            name: 'One Day',
            artist: 'G-Eazy',
            album: 'Freak Show',
            id: 1,
            uri: 'https://open.spotify.com/track/0mo6L5y8olr6HtK8kTGfBh'
        },
        {
            name: 'Lie',
            artist: 'Sasha Alex Sloan',
            album: 'Single',
            id: 2,
            uri: 'https://open.spotify.com/track/04NMWz4ctkuILV6mUR2iWp'
        },
        {
            name: 'Mask Off',
            artist: 'Future',
            album: 'Future',
            id: 3,
            uri: 'https://open.spotify.com/track/0VgkVdmE4gld66l8iyGjgx'
        }
      ]);

      function addTrack(track) {
        const existingTrack = playlistTracks.find((t) => t.id === track.id);
        const newTrack = playlistTracks.concat(track);
        if(existingTrack){
            console.log("Track exists")
        }
        else{
            setPlaylistTracks(newTrack);
        }
      }

      function removeTrack(track) {
        const existingTrack = playlistTracks.filter((t) => t.id !== track.id);
        setPlaylistTracks(existingTrack);
      }

      function updatePlaylistName(name){
        setPlaylistName(name);
      }

      function savePlaylist(){
        const trackURIs = playlistTracks.map((t) => t.uri);
        Spotify.savePlaylist(playlistName, trackURIs).then(() => {
          setPlaylistName("New Playlist");
          setPlaylistTracks([]);
        });
      }

      function search(term){
        Spotify.search(term).then((result) => setSearchResults(result));
        console.log(term);
      }

    return (
        <div>
            <h1>
                Ja<span className={styles.highlight}>mmm</span>ing
            </h1>
            <div className={styles.App}>
                <SearchBar onSearch={search}/>


                <div className={styles['App-playlist']}>
                    
                    <SearchResults userSearchResults={searchResults} onAdd={addTrack}/>

                    <Playlist playlistName={playlistName} 
                    playlistTracks={playlistTracks} 
                    onRemove={removeTrack}
                    onNameChange={updatePlaylistName}
                    onSave={savePlaylist}
                    />
                </div>
            </div>
        </div>
    )
}

export default App;
