'use client';

import { cn, configureAssistant, getSubjectColor } from '@/lib/utils';
import { vapi } from '@/lib/vapi.sdk';
import { CompanionComponentProps } from '@/types';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
// import { subjects, subjectsColors, voices, recentSessions } from '@/constants';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import soundwaves from '@/constants/soundwaves.json';

enum CallStatus {
  INACTIVE = 'INACTIVE',
  CONNECTING = 'CONNECTING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}

const CompanionComponent = ({ 
  companionId, 
  subject, 
  topic, 
  name, 
  userName, 
  userImage, 
  style, 
  voice 
}: CompanionComponentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (lottieRef.current) {
      if (isSpeaking) {
        lottieRef.current.play();
      } else {
        lottieRef.current.stop();
      }
    }
  }, [isSpeaking]);

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
      console.log('Call started');
    };
    
    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
      console.log('Call ended');
      //addTo Session history(companionId)
    };

    const onMessage = (message: any) => {
      if (message.type === 'transcript' && message.transcript) {
        setMessages(prev => [...prev, message.transcript]);
      }
      console.log('Message:', message);
    };

    const onError = (error: Error) => {
      console.error('Vapi error:', error);
      setCallStatus(CallStatus.INACTIVE);
    };

    const onSpeechStart = () => {
      setIsSpeaking(true);
      console.log('Speech started');
    };
    
    const onSpeechEnd = () => {
      setIsSpeaking(false);
      console.log('Speech ended');
    };

    vapi.on('call-start', onCallStart);
    vapi.on('call-end', onCallEnd);
    vapi.on('message', onMessage);
    vapi.on('error', onError);
    vapi.on('speech-start', onSpeechStart);
    vapi.on('speech-end', onSpeechEnd);

    return () => {
      vapi.off('call-start', onCallStart);
      vapi.off('call-end', onCallEnd);
      vapi.off('message', onMessage);
      vapi.off('error', onError);
      vapi.off('speech-start', onSpeechStart);
      vapi.off('speech-end', onSpeechEnd);
    };
  }, []);

  const toggleMicrophone = () => {
    if (callStatus !== CallStatus.ACTIVE) return;
    const muted = vapi.isMuted();
    vapi.setMuted(!muted);
    setIsMuted(!muted);
  };

  const handleCall = async () => {
    try {
      setCallStatus(CallStatus.CONNECTING);
      console.log('Starting call with:', { voice, style, subject, topic });
      
      const assistant = configureAssistant(voice, style);
      console.log('Assistant configured:', assistant);
      
      const assistantOverrides = {
        variableValues: {
          subject,
          topic,
          style
        }
      };

      await vapi.start(assistant, assistantOverrides);
      console.log('Vapi.start completed');
    } catch (error) {
      console.error('Failed to start call:', error);
      setCallStatus(CallStatus.INACTIVE);
    }
  };

  const handleDisconnect = async () => {
    try {
      setCallStatus(CallStatus.FINISHED);
      vapi.stop();
      console.log('Call stopped');
    } catch (error) {
      console.error('Failed to stop call:', error);
      setCallStatus(CallStatus.INACTIVE);
    }
  };

  return (
    <section className='flex flex-col h-[70vh]'>
      <section className='flex gap-8 max-sm:flex-col'>
        <div className='companion-section'>
          <div 
            className='companion-avatar' 
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <div className={cn(
              'absolute transition-opacity duration-1000',
              (callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE) 
                ? 'opacity-100' 
                : 'opacity-0',
              callStatus === CallStatus.CONNECTING && 'opacity-100 animate-pulse'
            )}>
              <Image 
                src={`/icons/${subject}.svg`} 
                alt={subject} 
                width={100} 
                height={100} 
                className='max-sm:w-fit'
              />
            </div>
            <div className={cn(
              'absolute transition-opacity duration-1000',
              callStatus === CallStatus.ACTIVE ? 'opacity-100' : 'opacity-0'
            )}>
              <Lottie
                lottieRef={lottieRef}
                animationData={soundwaves}
                autoPlay={false}
                className='companion-lottie'
              />
            </div>
          </div>
          <p className='font-bold text-2xl'>{name}</p>
        </div>

        <div className='user-section'>
          <div className='user-avatar'>
            <Image 
              src={userImage} 
              alt={userName} 
              width={130} 
              height={130} 
              className='rounded-lg'
            />
            <p className='font-bold text-2xl'>{userName}</p>
          </div>
          
          <button 
            className='btn-mic' 
            onClick={toggleMicrophone}
            disabled={callStatus !== CallStatus.ACTIVE}
          >
            <Image 
              src={isMuted ? '/icons/mic-off.svg' : '/icons/mic-on.svg'} 
              alt='mic' 
              width={36} 
              height={36}
            />
            <p className='max-sm:hidden'>
              {isMuted ? 'Turn on mic' : 'Turn off mic'}
            </p>
          </button>

          <button 
            className={cn(
              'rounded-lg py-2 cursor-pointer transition-colors w-full text-white',
              callStatus === CallStatus.ACTIVE ? 'bg-amber-700' : 'bg-primary',
              callStatus === CallStatus.CONNECTING && 'animate-pulse'
            )} 
            onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}
            disabled={callStatus === CallStatus.CONNECTING}
          >
            {callStatus === CallStatus.ACTIVE 
              ? "End Session" 
              : callStatus === CallStatus.CONNECTING
                ? "Connecting..." 
                : "Start Session"
            }
          </button>
        </div>
      </section>

      <section className='transcript'>
        <div className='transcript-message no-scrollbar'>
          {messages.length === 0 ? (
            <p className='text-gray-400'>No messages yet...</p>
          ) : (
            messages.map((msg, index) => (
              <p key={index} className='mb-2'>{msg}</p>
            ))
          )}
        </div>
        <div className='transcript-fade' />
      </section>
    </section>
  );
};

export default CompanionComponent;