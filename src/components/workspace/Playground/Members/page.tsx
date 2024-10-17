'use client'

import React, { useState, useEffect } from 'react';
import { useSocket } from '@/components/provider/SocketProvider';
import { Mic, MicOff, User } from 'lucide-react';
import { useGetUsername } from '@/hooks/useGetUsername';
import { Member } from '@/types/problems';
import { useSession } from 'next-auth/react';

type MembersProps = {
    roomId: string;
};

const Members: React.FC<MembersProps> = ({ roomId }) => {
    const {data: session} = useSession();
    const currentUsername = session?.user?.username;
    const [members, setMembers] = useState<Member[]>([]);
    const socket = useSocket();
    const [isHost, setIsHost] = useState(false);

    useEffect(() => {
        if (socket) {
            
            socket.emit('getRoomMembers', { roomId }, (roomMembers: Member[]) => {
                setMembers(roomMembers);
            });

            
            socket.on('updateMembers', (updatedMembers: Member[]) => {
                setMembers(updatedMembers);
            });

            
            socket.emit('getHost', { roomId }, (response: any) => {
                if (response.success) {
                    setIsHost(response.host === currentUsername);
                }
            });

            // Mute the current user when joining or refreshing
            // socket.emit('toggleMic', { roomId, username: currentUsername, isMuted: true });
        }

        return () => {
            if (socket) {
                socket.off('updateMembers');
            }
        };
    }, [socket, roomId, currentUsername]);

    // For mic functionality
    const handleMicToggle = (username: string, isMuted: boolean) => {
        if (socket) {
            socket.emit('toggleMic', { roomId, username, isMuted: !isMuted });
        }
    };

    return (
        // For mic functionality
        // <div className="bg-white shadow-sm rounded-lg p-4">
        //     <ul className="space-y-2">
        //         {members.map((member, index) => (
        //             <li key={index} className="flex items-center justify-between space-x-2">
        //                 <div className="flex items-center space-x-2">
        //                     <User size={20} className="text-gray-500" />
        //                     <span>{member.username}</span>
        //                 </div>
        //                 <button 
        //                     onClick={() => handleMicToggle(member.username, member.isMuted)}
        //                     className="focus:outline-none"
        //                     disabled={isHost ? false : member.username !== currentUsername}
        //                 >
        //                     {member.isMuted ? (
        //                         <MicOff size={20} className="text-gray-500" />
        //                     ) : (
        //                         <Mic size={20} className="text-gray-500" />
        //                     )}
        //                 </button>
        //             </li>
        //         ))}
        //     </ul>
        // </div>

        <div className="bg-white shadow-sm rounded-lg p-4">
            {/* <h2 className="text-lg font-semibold mb-4">Room Members</h2> */}
            <ul className="space-y-2">
                {members.map((member, index) => (
                <li key={index} className="flex items-center space-x-2">
                    <User size={20} className="text-gray-500" />
                    <span>{member.username}</span>
                </li>
                ))}
            </ul>
        </div>
    );
};

export default Members;