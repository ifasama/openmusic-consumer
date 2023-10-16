const { Pool } = require('pg');

class PlaylistService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylist(playlistId) {
    const queryPlaylist = {
      text: `SELECT playlists.id, playlists.name
      FROM playlists
      WHERE playlists.id = $1`,
      values: [playlistId],
      };
      
      const querySong = {
        text: `SELECT songs.id, songs.title, songs.performer
        FROM songs LEFT JOIN
        playlist_songs AS ps ON songs.id = ps.song_id
        WHERE ps.playlist_id = $1`,
        values: [playlistId],
      };
  
      const resultPlaylist = await this._pool.query(queryPlaylist);
      const resultSong = await this._pool.query(querySong);
      return {playlist: {...resultPlaylist.rows[0], songs: resultSong.rows}};
  }
}

module.exports = PlaylistService;
