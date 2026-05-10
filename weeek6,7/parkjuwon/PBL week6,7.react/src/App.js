import './App.css';
import React, { useState } from 'react';

import myDogImg from './mydog.202020198.jpg';
import pic1 from './1.jpg'
import pic2 from './2.jpg'
import pic3 from './3.jpg'
import pic4 from './4.jpg'
import pic5 from './5.jpg'
import pic6 from './6.jpg'
import pic7 from './7.jpg'
import pic8 from './8.jpg'

function App() {
  const [showBabyLionForm, setShowBabyLionForm] = useState(false);
  const [addedLions, setAddedLions] = useState([]);
  const [baseLionCount, setBaseLionCount] = useState(9);
  const [partFilter, setPartFilter] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [requestStatus, setRequestStatus] = useState('준비 완료');
  const [isLoading, setIsLoading] = useState(false);

  const parts = ['Frontend', 'Backend', 'Design'];
  const getRandomItem = (items) => items[Math.floor(Math.random() * items.length)];

  const convertRandomUserToLion = (user) => {
    const part = getRandomItem(parts);
    const city = user.location?.city || 'Unknown';
    const country = user.location?.country || 'Unknown';

    return {
      name: `${user.name.first} ${user.name.last}`,
      part,
      summary: `${part} · ${country} ${city}에서 합류했어요!`,
      image: user.picture?.large || myDogImg,
    };
  };

  const fetchRandomLions = async (count, replace = false) => {
    try {
      setIsLoading(true);
      setRequestStatus('불러오는 중...');

      const response = await fetch(`https://randomuser.me/api/?results=${count}&nat=us,gb,ca,au,nz`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      const randomLions = data.results.map(convertRandomUserToLion);

      if (replace) {
        setBaseLionCount(0);
        setAddedLions(randomLions);
      } else {
        setAddedLions((prevLions) => [...prevLions, ...randomLions]);
      }

      setRequestStatus('완료!');
    } catch (error) {
      setRequestStatus(`불러오기 실패: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const matchesFilter = (name, part) => {
    const matchesPart = partFilter === 'all' || part === partFilter;
    const matchesName = name.toLowerCase().includes(searchText.toLowerCase());

    return matchesPart && matchesName;
  };

  const handleAddBabyLion = () => {
    const form = document.querySelector('.baby-lion-form');
    const fields = form.querySelectorAll('input, select, textarea');

    const newLion = {
      name: fields[0].value,
      part: fields[1].value,
      summary: fields[3].value,
    };

    setAddedLions([...addedLions, newLion]);
    setShowBabyLionForm(false);
  };

  const handleRemoveLastBabyLion = () => {
    if (addedLions.length > 0) {
      setAddedLions(addedLions.slice(0, -1));
    } else if (baseLionCount > 0) {
      setBaseLionCount(baseLionCount - 1);
    }
  };

  return (
    <div className="App">
      
      <form>
        <button type="button" className='add' onClick={() => setShowBabyLionForm(true)}>아기 사자 추가</button>
        <button type="button" className='remove' onClick={handleRemoveLastBabyLion}>마지막 아기 사자 삭제</button>
        <span for="total">총 {baseLionCount + addedLions.length}명</span>
      </form>

      <form>
        <button type="button" className='random1' onClick={() => fetchRandomLions(1)} disabled={isLoading}>랜덤 1명 추가</button>
        <button type="button" className='random5' onClick={() => fetchRandomLions(5)} disabled={isLoading}>랜덤 5명 추가</button>
        <button type="button" className='refresh' onClick={() => fetchRandomLions(19, true)} disabled={isLoading}>전체 새로고침</button>
        <span for="RandomBtn">{requestStatus}</span>
      </form>

      <form>
        <span for="part">파트</span>
        <select id="part" required value={partFilter} onChange={(e) => setPartFilter(e.target.value)}>
          <option value="all">전체</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Design">Design</option>
        </select>

        <span for="sort">정렬</span>
        <select id="sort" required>
          <option value="all">최신 추가 순</option>
        </select>

        <span for="search">검색</span>
        <input className="search-input" type="text" placeholder="이름을 입력하세요" value={searchText} onChange={(e) => setSearchText(e.target.value)}></input>
      </form>


      {showBabyLionForm && (
        <div className="baby-lion-form">
          <div className="baby-lion-row">
            <label>
              이름
              <input type="text" />
            </label>
            <label>
              파트
              <select defaultValue="Frontend">
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Design">Design</option>
              </select>
            </label>
          </div>

          <label>
            관심 기술 (쉼표로 구분)
            <input type="text" />
          </label>

          <label>
            한 줄 소개 (요약 카드)
            <input type="text" />
          </label>

          <label>
            자기소개 (상세 카드)
            <textarea />
          </label>

          <div className="baby-lion-row">
            <label>
              Email
              <input type="email" />
            </label>
            <label>
              Phone
              <input type="text" />
            </label>
          </div>

          <label>
            Website
            <input type="text" />
          </label>

          <label>
            한 마디
            <input type="text" />
          </label>

          <div className="baby-lion-actions">
            <button type="button">랜덤 값 채우기</button>
            <button type="button" onClick={handleAddBabyLion}>추가하기</button>
            <button type="button" onClick={() => setShowBabyLionForm(false)}>취소</button>
          </div>
        </div>
      )}


      <div class="cardlist">
        <div className="card" style={{ display: baseLionCount >= 1 && matchesFilter('박주원', 'Frontend') ? 'flex' : 'none' }}>
          <img src={myDogImg} alt="사진" width="200" height="200" />
          <h2>박주원</h2>
          <p className='myrole'>Frontend</p>
          <p>처음 배우는 프론트엔드 개발자입니다!</p>
        </div>

        <div className="card" style={{ display: baseLionCount >= 2 && matchesFilter('park', 'Frontend') ? 'flex' : 'none' }}>
          <img src={pic1} alt="사진" width="200" height="200" />
          <h2>park</h2>
          <p>Frontend</p>
          <p>처음 배우는 프론트엔드 개발자입니다!</p>
        </div>

        <div className="card" style={{ display: baseLionCount >= 3 && matchesFilter('공원', 'Frontend') ? 'flex' : 'none' }}>
          <img src={pic2} alt="사진" width="200" height="200" />
          <h2>공원</h2>
          <p>Frontend</p>
          <p>처음 배우는 프론트엔드 개발자입니다!</p>
        </div>

        <div className="card" style={{ display: baseLionCount >= 4 && matchesFilter('주원', 'Frontend') ? 'flex' : 'none' }}>
          <img src={pic3} alt="사진" width="200" height="200" />
          <h2>주원</h2>
          <p>Frontend</p>
          <p>처음 배우는 프론트엔드 개발자입니다!</p>
        </div>

        <div className="card" style={{ display: baseLionCount >= 5 && matchesFilter('원', 'Frontend') ? 'flex' : 'none' }}>
          <img src={pic4} alt="사진" width="200" height="200" />
          <h2>원</h2>
          <p>Frontend</p>
          <p>처음 배우는 프론트엔드 개발자입니다!</p>
        </div>

        <div className="card" style={{ display: baseLionCount >= 6 && matchesFilter('원주', 'Frontend') ? 'flex' : 'none' }}>
          <img src={pic5} alt="사진" width="200" height="200" />
          <h2>원주</h2>
          <p>Frontend</p>
          <p>처음 배우는 프론트엔드 개발자입니다!</p>
        </div>


        <div className="card" style={{ display: baseLionCount >= 7 && matchesFilter('원주율', 'Design') ? 'flex' : 'none' }}>
          <img src={pic6} alt="사진" width="200" height="200" />
          <h2>원주율</h2>
          <p>Design</p>
          <p>처음 배우는 디자이너입니다!</p>
        </div>


        <div className="card" style={{ display: baseLionCount >= 8 && matchesFilter('π', 'Frontend') ? 'flex' : 'none' }}>
          <img src={pic7} alt="사진" width="200" height="200" />
          <h2>π</h2>
          <p>Frontend</p>
          <p>처음 배우는 프론트엔드 개발자입니다!</p>
        </div>


        <div className="card" style={{ display: baseLionCount >= 9 && matchesFilter('사과파이', 'Frontend') ? 'flex' : 'none' }}>
          <img src={pic8} alt="사진" width="200" height="200" />
          <h2>사과파이</h2>
          <p>Frontend</p>
          <p>처음 배우는 프론트엔드 개발자입니다!</p>
        </div>

        {addedLions.filter((lion) => matchesFilter(lion.name, lion.part)).map((lion, index) => (
          <div className="card" key={index}>
            <img src={lion.image || myDogImg} alt="사진" width="200" height="200" />
            <h2>{lion.name}</h2>
            <p>{lion.part}</p>
            <p>{lion.summary}</p>
          </div>
        ))}
      </div>

      <div className="detail">
        <h2>박주원</h2>
        <p className="myrole">Frontend</p>
        <p style={{ color: '#999', fontSize: '0.8rem' }}>LION TRACK</p>

        <h3>자기소개</h3>
        <p>html,css,js를 공부하며 react를 처음 접하게 되었습니다.</p>

        <h3>연락처</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>Email: 0601sunny@gmail.com</li>
          <li>Phone: 010-6215-2640</li>
        </ul>

        <h3>관심 기술</h3>
        <p>React, JavaScript, C#</p>

        <h3>한 마디</h3>
        <p>열심히 하겠습니다</p>
      </div>

      <div className="detail">
        <h2>박주원</h2>
        <p className="myrole">Frontend</p>
        <p style={{ color: '#999', fontSize: '0.8rem' }}>LION TRACK</p>

        <h3>자기소개</h3>
        <p>html,css,js를 공부하며 react를 처음 접하게 되었습니다.</p>

        <h3>연락처</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>Email: 0601sunny@gmail.com</li>
          <li>Phone: 010-6215-2640</li>
        </ul>

        <h3>관심 기술</h3>
        <p>React, JavaScript, C#</p>

        <h3>한 마디</h3>
        <p>열심히 하겠습니다</p>
      </div>

      <div className="detail">
        <h2>박주원</h2>
        <p className="myrole">Frontend</p>
        <p style={{ color: '#999', fontSize: '0.8rem' }}>LION TRACK</p>

        <h3>자기소개</h3>
        <p>html,css,js를 공부하며 react를 처음 접하게 되었습니다.</p>

        <h3>연락처</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>Email: 0601sunny@gmail.com</li>
          <li>Phone: 010-6215-2640</li>
        </ul>

        <h3>관심 기술</h3>
        <p>React, JavaScript, C#</p>

        <h3>한 마디</h3>
        <p>열심히 하겠습니다</p>
      </div>

      <div className="detail">
        <h2>박주원</h2>
        <p className="myrole">Frontend</p>
        <p style={{ color: '#999', fontSize: '0.8rem' }}>LION TRACK</p>

        <h3>자기소개</h3>
        <p>html,css,js를 공부하며 react를 처음 접하게 되었습니다.</p>

        <h3>연락처</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>Email: 0601sunny@gmail.com</li>
          <li>Phone: 010-6215-2640</li>
        </ul>

        <h3>관심 기술</h3>
        <p>React, JavaScript, C#</p>

        <h3>한 마디</h3>
        <p>열심히 하겠습니다</p>
      </div>

      <div className="detail">
        <h2>박주원</h2>
        <p className="myrole">Frontend</p>
        <p style={{ color: '#999', fontSize: '0.8rem' }}>LION TRACK</p>

        <h3>자기소개</h3>
        <p>html,css,js를 공부하며 react를 처음 접하게 되었습니다.</p>

        <h3>연락처</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>Email: 0601sunny@gmail.com</li>
          <li>Phone: 010-6215-2640</li>
        </ul>

        <h3>관심 기술</h3>
        <p>React, JavaScript, C#</p>

        <h3>한 마디</h3>
        <p>열심히 하겠습니다</p>
      </div>

      <div className="detail">
        <h2>박주원</h2>
        <p className="myrole">Frontend</p>
        <p style={{ color: '#999', fontSize: '0.8rem' }}>LION TRACK</p>

        <h3>자기소개</h3>
        <p>html,css,js를 공부하며 react를 처음 접하게 되었습니다.</p>

        <h3>연락처</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>Email: 0601sunny@gmail.com</li>
          <li>Phone: 010-6215-2640</li>
        </ul>

        <h3>관심 기술</h3>
        <p>React, JavaScript, C#</p>

        <h3>한 마디</h3>
        <p>열심히 하겠습니다</p>
      </div>

      <div className="detail">
        <h2>박주원</h2>
        <p className="myrole">Frontend</p>
        <p style={{ color: '#999', fontSize: '0.8rem' }}>LION TRACK</p>

        <h3>자기소개</h3>
        <p>html,css,js를 공부하며 react를 처음 접하게 되었습니다.</p>

        <h3>연락처</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>Email: 0601sunny@gmail.com</li>
          <li>Phone: 010-6215-2640</li>
        </ul>

        <h3>관심 기술</h3>
        <p>React, JavaScript, C#</p>

        <h3>한 마디</h3>
        <p>열심히 하겠습니다</p>
      </div>

      <div className="detail">
        <h2>박주원</h2>
        <p className="myrole">Frontend</p>
        <p style={{ color: '#999', fontSize: '0.8rem' }}>LION TRACK</p>

        <h3>자기소개</h3>
        <p>html,css,js를 공부하며 react를 처음 접하게 되었습니다.</p>

        <h3>연락처</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>Email: 0601sunny@gmail.com</li>
          <li>Phone: 010-6215-2640</li>
        </ul>

        <h3>관심 기술</h3>
        <p>React, JavaScript, C#</p>

        <h3>한 마디</h3>
        <p>열심히 하겠습니다</p>
      </div>

      <div className="detail">
        <h2>박주원</h2>
        <p className="myrole">Frontend</p>
        <p style={{ color: '#999', fontSize: '0.8rem' }}>LION TRACK</p>

        <h3>자기소개</h3>
        <p>html,css,js를 공부하며 react를 처음 접하게 되었습니다.</p>

        <h3>연락처</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>Email: 0601sunny@gmail.com</li>
          <li>Phone: 010-6215-2640</li>
        </ul>

        <h3>관심 기술</h3>
        <p>React, JavaScript, C#</p>

        <h3>한 마디</h3>
        <p>열심히 하겠습니다</p>
      </div>

      <div className="detail">
        <h2>박주원</h2>
        <p className="myrole">Frontend</p>
        <p style={{ color: '#999', fontSize: '0.8rem' }}>LION TRACK</p>

        <h3>자기소개</h3>
        <p>html,css,js를 공부하며 react를 처음 접하게 되었습니다.</p>

        <h3>연락처</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>Email: 0601sunny@gmail.com</li>
          <li>Phone: 010-6215-2640</li>
        </ul>

        <h3>관심 기술</h3>
        <p>React, JavaScript, C#</p>

        <h3>한 마디</h3>
        <p>열심히 하겠습니다</p>
      </div>

    </div>
  );
}

export default App;
