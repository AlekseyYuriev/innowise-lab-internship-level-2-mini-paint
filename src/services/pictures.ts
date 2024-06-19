import {
  getDownloadURL,
  getStorage,
  listAll,
  ref as sRef,
  uploadString
} from 'firebase/storage'

export interface UserPicture {
  userEmail: string | null
  timestamp: number
  picture: string
}

export const getAllPictures = async () => {
  const userPicturesArray: UserPicture[] = []

  const storage = getStorage()

  const listRef = sRef(storage, 'pictures/')

  const storageRoutes = await listAll(listRef)

  for (const folderRef of storageRoutes.prefixes) {
    const userRef = sRef(storage, `pictures/${folderRef.name}`)
    const imageList = await listAll(userRef)

    for (const image of imageList.items) {
      const userEmail = image.fullPath.split('/')[1]
      const createdDate = Number(image.fullPath.split('/')[2])
      const url = await getDownloadURL(sRef(storage, image.fullPath))
      userPicturesArray.push({
        userEmail: userEmail,
        timestamp: createdDate,
        picture: url
      })
    }
  }
  return userPicturesArray
}

export const savePicture = async (
  userEmail: string,
  dateTimestamp: number,
  imageData: string
) => {
  const storage = getStorage()
  const storageRef = sRef(storage, `pictures/${userEmail}/${dateTimestamp}`)
  uploadString(storageRef, imageData, 'data_url').then((snapshot) => {
    console.log('Uploaded a data_url string!')
  })
}
