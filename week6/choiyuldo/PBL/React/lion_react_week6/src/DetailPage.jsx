import { useParams, useNavigate } from 'react-router-dom';
import DetailCard from '../DetailCard';

function DetailPage({ lions }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // URL의 id와 일치하는 사자 찾기
  const lion = lions.find(l => l.id.toString() === id);

  if (!lion) return <div>사자를 찾을 수 없습니다.</div>;

  return (
    <section className="detail-section">
      <button onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>뒤로 가기</button>
      <h2>{lion.name}님의 상세 프로필</h2>
      <DetailCard lion={lion} />
    </section>
  );
}

export default DetailPage;