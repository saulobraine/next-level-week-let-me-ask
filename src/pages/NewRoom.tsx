import { Link } from 'react-router-dom';

import illustration from '../assets/images/illustration.svg';
import logo from '../assets/images/logo.svg';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

import '../styles/new-room.scss';

export function NewRoom() {

  const { user } = useAuth();

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
          <form>
            <input
              type="text"
              placeholder="Digite o código da sala"
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
          <p>Quer entrar em uma sala existente? <Link to="/">clique aqui</Link></p>
        </div>
      </main>
    </div>
  );
}
