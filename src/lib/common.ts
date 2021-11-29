export const generateRandomString = function(length:number) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};


export const MONGO_DB_COLLECTION_AUTOARCHIVE = "auto_archive"
export const MONGO_DB_COLLECTION_AUTOARCHIVEHISTORY = "auto_archive_history"