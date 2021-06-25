import { Link, useHistory, useParams } from 'react-router-dom';

import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';
import { Button } from '../components/Button';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import '../styles/room.scss';

type RoomParams = {
  id: string;
}

export function AdminRoom() {

  const history = useHistory();
  const params = useParams<RoomParams>();

  const roomId = params.id;

  const { questions, title } = useRoom(roomId);

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que deseja excluir essa pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }
  async function handleEndRoom(roomId: string) {
    if (window.confirm("Tem certeza que deseja encerrar essa sala?")) {
      await database.ref(`rooms/${roomId}`).update({
        endedAt: new Date(),
      });

      history.push('/')
    }
  }


  return (
    <div id="page-room">
      <header>
        <div className="content">
          <Link to="/rooms/new"><img src={logoImg} alt="Letmeask" /></Link>
          <div>
            <RoomCode roomCode={roomId} />
            <Button
              onClick={() => handleEndRoom(roomId)}
              isOutlined
            > Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>{title}</h1>
          {questions.length > 0 && (
            <span>{questions.length} pergunta{questions.length > 1 && ('s')}</span>
          )}
        </div>

        <div className="question-list">
          {questions.map(question => (
            <Question
              key={question.id}
              author={question.author}
              content={question.content}
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
            >
              {!question.isAnswered && (
                <>
                  <button onClick={() => handleCheckQuestionAsAnswered(question.id)}>
                    <img src={checkImg} alt="Marcar pergunta como respondida" />
                  </button>
                  <button onClick={() => handleHighlightQuestion(question.id)}>
                    <img src={answerImg} alt="Dar destaque à pertunta" />
                  </button>
                </>
              )}

              <button onClick={() => handleDeleteQuestion(question.id)}>
                <img src={deleteImg} alt="Deletar pergunta" />
              </button>
            </Question>
          ))}
        </div>


      </main>
    </div >
  );
}
