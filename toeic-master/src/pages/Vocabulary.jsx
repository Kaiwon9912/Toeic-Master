import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Vocabulary = (props) => {
  const [vocabulary, setVocabulary] = useState(null);

  useEffect(() => {
    // Gọi API để lấy dữ liệu từ
    axios.get('https://api.dictionaryapi.dev/api/v2/entries/en/' + props.word)
      .then((response) => {
        // Chỉ lấy thông tin cần thiết từ API
        const data = response.data[0];
        const wordData = {
          word: data.word,
          phonetic: data.phonetic,
          pronunciationAudio: data.phonetics.find(phonetic => phonetic.audio)?.audio || '',
          partOfSpeech: data.meanings[0].partOfSpeech,
          definition: data.meanings[0].definitions[0].definition,
          example: data.meanings[0].definitions[0].example,
        };
        setVocabulary(wordData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  if (!vocabulary) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{vocabulary.word}</h1>
      <p><strong>Phonetic:</strong> {vocabulary.phonetic}</p>
      {vocabulary.pronunciationAudio && (
        <div>
          <strong>Pronunciation:</strong>
          <audio controls>
            <source src={vocabulary.pronunciationAudio} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
      <p><strong>Part of Speech:</strong> {vocabulary.partOfSpeech}</p>
      <p><strong>Definition:</strong> {vocabulary.definition}</p>
      {vocabulary.example && <p><strong>Example:</strong> {vocabulary.example}</p>}
    </div>
  );
};

export default Vocabulary;
