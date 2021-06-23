import { useState } from 'react';
import { FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';

import illustration from '../assets/images/illustration.svg';
import logo from '../assets/images/logo.svg';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import '../styles/new-room.scss';
import { CreateSlug } from '../utils/CreateSlug';

export function NewRoom() {

  const history = useHistory();

  const { user } = useAuth();

  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    // Clean spaces and verify length
    if (newRoom.trim() === '') {
      return;
    }

    // Set a minimum length
    if (newRoom.length < 5) {
      alert('Room name must be at least 5 characters long');
      return;
    }

    // Set prohibited terms
    const prohibited_terms = [
      'sexo',
      'putaria',
      '+18',
      'bunda',
      'pinto',
      'penis',
      'pornografia'
    ];

    // Verify prohibited terms
    if (prohibited_terms.includes(newRoom)) {
      alert('Room terms not allowed!');
      return;
    }

    const roomRef = database.ref().child('rooms');

    const slugRoom = CreateSlug(newRoom);

    const roomCheck = await database.ref(`/rooms/${slugRoom}`).get();

    if (roomCheck.exists()) {
      alert('Room already exists!');
      return;
    }

    const firebaseRoom = await roomRef.child(slugRoom).set({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/rooms/${slugRoom}`);
  }

  return (
    <div id="page-new-room">
      <aside>
        <img src={illustration} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logo} alt="Letmeask" />
          <h2>Crie uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
          <p>Quer entrar em uma sala existente? <Link to="/">clique aqui</Link></p>
        </div>
      </main>
    </div>
  );
}
