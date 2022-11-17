import { useState } from 'react';
import styles from './App.module.css';
import poweredImage from './assets/powered.png';
import leftArrow from './assets/leftarrow.png';
import { GridItem } from './components/GridItem';
import {levels, CalculateIMC, Level} from './helpers/imc';



function App() {
  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null)

  const handleCalculeteButton = () => {
      if(heightField && weightField) {
        setToShow(CalculateIMC(heightField, weightField))
      } else {
        alert("todos os campos precisam esta preenchidos")
      }
  };
  const handleBackButton = () => {
    setToShow(null);
    setHeightField(0);
    setWeightField(0)
  }
  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="" width={150}/>
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC.</h1>
          <p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.</p>

          <input 
            type="number"
            placeholder="Digite sua altura. Ex: 1.56(em métros)"
            value={heightField > 0 ? heightField : ''}
            onChange={e => setHeightField(Number(e.target.value))}
            disabled={toShow ? true : false}
          />
          <input 
            type="number"
            placeholder="Digite sua altura. Ex: 83.6 (em kg)"
            value={weightField > 0 ? weightField : ''}
            onChange={e => setWeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />
          <button onClick={handleCalculeteButton}>Calcular</button>
        </div>
        <div className={styles.rightSide}>
          {!toShow && 
            <div className={styles.grid}>
              {levels.map((item, key) => (
                <GridItem key={key} item={item}/>
              ))}
            </div>
          }
          {toShow &&
            <div className={styles.rightBig}> 
              <div className={styles.rightArrow} onClick={handleBackButton} >
                <img src={leftArrow} width="20" />
              </div>
              <GridItem item={toShow}/>
            </div>
          }
        </div> 
      </div>
    </div>
  )
}

export default App
