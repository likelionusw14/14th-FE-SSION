import logo from './logo.svg';
import './App.css';
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
  return (
    <div className="App">

      <form>
        <button className='add'>아기 사자 추가</button>
        <button className='renmove'>마지막 아기 사자 삭제</button>
        <span for="total">총 9명</span>
      </form>

      <form>
        <button className='random1'>랜덤 1명 추가</button>
        <button className='random5'>랜덤 1명 추가</button>
        <button className='refresh'>새로고침</button>
        <span for="RandomBtn">준비 완료</span>
      </form>

      <form>
        <span for="part">파트</span>
        <select id="part" required>
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
        <select id="search" required>
          <option value="all">이름으로 검색</option>
        </select>
      </form>

      <div class="cardlist">
        <div className="card">
          <img src={myDogImg} alt="사진" width="200" height="200" />
          <h2>박주원</h2>
          <p className='myrole'>Frontend</p>
          <p>처음 배우는 프론트엔드 개발자입니다!</p>
        </div>

        <div className="card">
          <img src={pic1} alt="사진" width="200" height="200" />
          <h2>park</h2>
          <p>Frontend</p>
          <p>처음 배우는 프론트엔드 개발자입니다!</p>
        </div>

        <div className="card">
          <img src={pic2} alt="사진" width="200" height="200" />
          <h2>공원</h2>
          <p>Frontend</p>
          <p>처음 배우는 프론트엔드 개발자입니다!</p>
        </div>

        <div className="card">
          <img src={pic3} alt="사진" width="200" height="200" />
          <h2>주원</h2>
          <p>Frontend</p>
          <p>처음 배우는 프론트엔드 개발자입니다!</p>
        </div>

        <div className="card">
          <img src={pic4} alt="사진" width="200" height="200" />
          <h2>원</h2>
          <p>Frontend</p>
          <p>처음 배우는 프론트엔드 개발자입니다!</p>
        </div>

        <div className="card">
          <img src={pic5} alt="사진" width="200" height="200" />
          <h2>원주</h2>
          <p>Frontend</p>
          <p>처음 배우는 프론트엔드 개발자입니다!</p>
        </div>


        <div className="card">
          <img src={pic6} alt="사진" width="200" height="200" />
          <h2>원주율</h2>
          <p>Frontend</p>
          <p>처음 배우는 프론트엔드 개발자입니다!</p>
        </div>


        <div className="card">
          <img src={pic7} alt="사진" width="200" height="200" />
          <h2>π</h2>
          <p>Frontend</p>
          <p>처음 배우는 프론트엔드 개발자입니다!</p>
        </div>


        <div className="card">
          <img src={pic8} alt="사진" width="200" height="200" />
          <h2>사과파이</h2>
          <p>Frontend</p>
          <p>처음 배우는 프론트엔드 개발자입니다!</p>
        </div>
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
