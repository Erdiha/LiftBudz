export async function doesUsernameExist(firestore: any, username: any) {
  const result = await firestore
    .collection('users')
    .where('username', '==', username)
    .get();
  return result.docs.map((user: any) => user.data().length > 0);
}
