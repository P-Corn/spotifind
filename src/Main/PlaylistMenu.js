import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import {MenuItem, IconButton} from '@material-ui/core';
import {Add} from '@material-ui/icons'

export default function PlaylistMenu({playlists, addToPlaylist, token, songId}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (token, playlistId, songId) => {
    setAnchorEl(null);
    addToPlaylist(token, playlistId, songId)
  };

//   () => addToPlaylist(token, song.id)

  return (
    <div>
      <IconButton onClick={handleClick}><Add/></IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {playlists.map((playlist) => (
            <MenuItem key={playlist.id} onClick={() => handleClose(token, playlist.id, songId)}>{playlist.name}</MenuItem>
        ))}
      </Menu>
    </div>
  );
}