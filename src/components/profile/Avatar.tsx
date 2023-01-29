import Avatar from 'avataaars';
import { generateRandomAvatarOptions } from '@/utils/AvatarConfig';

function App() {
  return (
    <>
      <Avatar
        style={{ width: '100px', height: '100px' }}
        avatarStyle="Circle"
        {...generateRandomAvatarOptions()}
      />
    </>
  );
}

export default App;
