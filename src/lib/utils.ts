

export const formatISODate = (date:Date) =>{
  const isoDate = new Date(date)

  const readeableDate = isoDate.toLocaleDateString("es-GT", {
    weekday:"long",
    year:"numeric",
    month:"long",
    day:"numeric"
  })

  const readeableTime = isoDate.toLocaleTimeString("es-GT", {
    hour:"numeric",
    minute:"numeric"
  })

  return `${readeableDate} ${readeableTime}`
}