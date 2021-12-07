export const generateRandomString = function(length:number) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const getBeginningOfTheWeekDate = (date:Date) => {

  const this_year = date.getFullYear()
  const this_month = date.getMonth()
  const this_date = date.getDate()
  const this_day = date.getDay()
  const this_monday = this_date - (this_day === 0 ? this_day+6:this_day-1)
  const WeekStart = new Date(this_year,this_month,this_monday)

  // console.log({this_year,this_month,this_date,this_day,this_monday,WeekStart})

  const fullyear = (d:Date):string => d.getFullYear() + ""
  const month = (d:Date):string => ((d.getMonth() + 1) < 10 ? "0" : "") + (d.getMonth() + 1) 
  const day = (d:Date):string => (d.getDate() < 10 ? "0" : "") + d.getDate() 
  return `${fullyear(WeekStart)}/${month(WeekStart)}/${day(WeekStart)}`
}


export const MONGO_DB_COLLECTION_AUTOARCHIVE = "auto_archive"
export const MONGO_DB_COLLECTION_AUTOARCHIVEHISTORY = "auto_archive_history"