import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { database } from '../services/firebase';

import illustration from '../assets/images/illustration.svg';
import logo from '../assets/images/logo.svg';
import logo_google from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { CreateSlug } from '../utils/CreateSlug';

import '../styles/auth.scss';

export function Home() {

  const history = useHistory();

  const [roomCode, setRoomCode] = useState('')

  const { user, signInWithGoogle } = useAuth();

  async function handleCreateRoom() {

    if (!user) {
      await signInWithGoogle();
    }

    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return
    }

    const slugRoom = CreateSlug(roomCode);

    const roomRef = await database.ref(`/rooms/${slugRoom}`).get();

    if (!roomRef.exists()) {
      alert('Room not found!');
      return;
    }

    history.push(`/rooms/${slugRoom}`);

  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustration} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logo} alt="Letmeask" />
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={logo_google} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">
            ou entre em uma sala
          </div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
