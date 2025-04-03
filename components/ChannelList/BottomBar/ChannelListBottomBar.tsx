import { useState } from 'react';
import { Mic, Speaker, Gear } from '../Icons';
import { useChatContext } from 'stream-chat-react';
import { UserButton, useUser } from '@clerk/nextjs';

export default function ChannelListBottomBar(): JSX.Element {
  const { client } = useChatContext();
  const [micActive, setMicActive] = useState(false);
  const [audioActive, setAudioActive] = useState(false);
  
  // Get user data from Clerk
  const { user } = useUser();
  
  // Extract first name from Clerk user data
  const firstName = user?.firstName || user?.username?.split(' ')[0] || client.user?.name?.split(' ')[0] || 'User';

  return (
    <div className='mt-auto p-2 bg-light-gray w-full flex items-center space-x-3 relative'>
      <div className='flex flex-1 items-center space-x-2 p-1'>
        <UserButton 
          afterSignOutUrl="/"
          appearance={{
            elements: {
              
              userButtonAvatarBox: 'w-9 h-9'
            }
          }}
        />
        <p className='flex flex-col items-start space-y-1'>
          <span className='block max-w-24 text-gray-700 text-sm font-medium -mb-1.5 tracking-tight text-ellipsis overflow-x-clip'>
            {firstName}
          </span>
          <span className='text-xs text-gray-500 inline-block'>
            {client.user?.online ? 'Online' : 'Offline'}
          </span>
        </p>
      </div>
      <button
        className={`w-7 h-7 p-1 flex items-center justify-center relative rounded-lg hover:bg-gray-300 transition-all duration-100 ease-in-out ${
          !micActive ? 'inactive-icon text-red-400' : 'text-gray-700'
        }`}
        onClick={() => setMicActive((currentValue) => !currentValue)}
      >
        <Mic />
      </button>
      <button
        className={`w-7 h-7 p-1 flex items-center justify-center relative rounded-lg hover:bg-gray-300 transition-all duration-100 ease-in-out ${
          !audioActive ? 'inactive-icon text-red-400' : 'text-gray-700'
        }`}
        onClick={() => setAudioActive((currentValue) => !currentValue)}
      >
        <Speaker />
      </button>
      <button className='w-7 h-7 p-1 flex items-center justify-center relative rounded-md hover:bg-gray-300 transition-all duration-100 ease-in-out text-gray-700'>
        <Gear className='w-full h-full' />
      </button>
    </div>
  );
}