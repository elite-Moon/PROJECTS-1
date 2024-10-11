import { useContext } from 'react';
import { assets } from '../../assets/assets';
import './Main.css';
import { Context } from '../../context/Context';
const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  } = useContext(Context);

  const handleCardClick = (suggestion) => {
    setInput(suggestion);
    onSent();
  };

  return (
    <div className='main'>
      <div className='nav'>
        <p>Gemini</p>
        <img src={assets.tomatoProfile} alt='' />
      </div>
      <div className='main-container'>
        {!showResult ? (
          <>
            <div className='greet'>
              <p>
                <span>Hello Dev.</span>
              </p>
              <p>How Can I assist you Today</p>
            </div>
            <div className='cards'>
              <div
                onClick={() =>
                  handleCardClick('Suggest Some New Foods in India')
                }
                className='card'
              >
                <p>Suggest Some New Foods in India </p>
                <img src={assets.compass_icon} alt='' />
              </div>
              <div
                onClick={() =>
                  handleCardClick('Upcoming movies to watch on netflix')
                }
                className='card'
              >
                <p>Upcoming movies to watch on netflix</p>
                <img src={assets.bulb_icon} alt='' />
              </div>
              <div
                onClick={() =>
                  handleCardClick('Suggest Some New Places to trave')
                }
                className='card'
              >
                <p>Suggest Some New Places to travel</p>
                <img src={assets.message_icon} alt='' />
              </div>
              <div
                onClick={() =>
                  handleCardClick('New Team building activity works')
                }
                className='card'
              >
                <p>New Team building activity works</p>
                <img src={assets.code_icon} alt='' />
              </div>
            </div>
          </>
        ) : (
          <div className='result'>
            <div className='result-title'>
              <img src={assets.tomatoProfile} alt='' />
              <p>{recentPrompt}</p>
            </div>
            <div className='result-data'>
              <img src={assets.gemini_icon} alt='' />

              {loading ? (
                <div className='loader'>
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className='main-bottom'>
          <div className='search-box'>
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type='text'
              name=''
              id=''
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onSent();
                }
              }}
              placeholder='Enter a Prompt here'
            />

            {input ? (
              <>
                <img src={assets.gallery_icon} alt='' />
                <img src={assets.mic_icon} alt='' />
                <img onClick={() => onSent()} src={assets.send_icon} alt='' />
              </>
            ) : null}
          </div>

          <p className='bottom-info'>
            Gemini may display inaccurate info, including about people , so
            double check its responses
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
