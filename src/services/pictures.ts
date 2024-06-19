import {
  getDownloadURL,
  getStorage,
  listAll,
  ref as sRef
} from 'firebase/storage'

export interface UserPicture {
  userEmail: string | null
  timestamp: number
  picture: string
}

export const getRefList = async () => {
  const storage = getStorage()

  const listRef = sRef(storage, 'pictures/')

  const refList: UserPicture[] = []

  const res = await listAll(listRef)

  for (const folderRef of res.prefixes) {
    const newRef = sRef(storage, `pictures/${folderRef.name}`)
    const list = await listAll(newRef)

    for (const item of list.items) {
      const userEmail = item.fullPath.split('/')[1]
      const createdDate = Number(item.fullPath.split('/')[2])
      const url = await getDownloadURL(sRef(storage, item.fullPath))
      refList.push({
        userEmail: userEmail,
        timestamp: createdDate,
        picture: url
      })
    }
  }

  return refList
}
