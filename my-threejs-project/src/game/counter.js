/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 07/03/2025 - 21:42:48
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 07/03/2025
    * - Author          : 
    * - Modification    : 
**/
import { GameScene } from './scene.js';

export function setupCounter(element) {
  let counter = 0
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}
