import React, { useState } from "react";
import SoundFont from 'sf2-player';
import "./App.css";


function App() {
  const [sf, setSF] = useState(new SoundFont());
  const [banks, setBanks] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [sfFile, setSfFile] = useState();


  const onChangeSf = async (event: any) => {
    if (/.sf2$/.exec(event.target.value)) {
      await sf.loadSoundFontFromFile(event.target.files[0]);
      setSfFile(event.target.files[0]);

      setBanks(sf.banks);
      sf.bank = sf.banks[0]['id'];
      setPrograms(sf.programs);
      sf.program = sf.programs[0]['id'];
    }
  }

  const changeBank = (event: any) => {
    sf.bank = event.target.value;
  }

  const changeProgram = (event: any) => {
    sf.program = event.target.value;
  }

  const play = (midiNum: number) => {
    sf.noteOn(midiNum);
  }

  const stop = (midiNum: number) => {
    sf.noteOff(midiNum);
  }

  return (
    <div>
      <fieldset>
        <legend>Open SF2 file</legend>
        <input type="file" onChange={onChangeSf} />
      </fieldset>
      {
        sfFile ? <div id="controls">
          <br></br>
          <hr>
          </hr><br></br>

          <fieldset>
            <legend>Bank</legend>
            <select name="bank" id="banks" onChange={changeBank}>
              {
                banks.map((bank: any) => <option value={bank.id} key={bank.id}>{bank.name}</option>)
              }
            </select>
          </fieldset>

          <fieldset>
            <legend>Program</legend>
            <select name="program" id="programs" onChange={changeProgram}>
              {
                programs.map((program: any) => <option value={program.id} key={program.id}>{program.name}</option>)
              }
            </select>
          </fieldset>

          <br></br>
          <hr>
          </hr><br></br>

          <div id="keys">
            {
              // [...new Array(60)].map((_, i) => i + 30).map(midiNum => <button key={midiNum} onMouseDown={() => play(midiNum)} onMouseUp={() => sf.nodeOff(midiNum)}>{midiNum}</button>)

              [...new Array(60)].map((_, i) => i + 30).map(midiNum => <button key={midiNum} onMouseDown={() => play(midiNum)} onMouseUp={() => stop2(midiNum)}>{midiNum}</button>)
            }
          </div>
        </div> : <></>
      }

    </div>
  );
}

export default App;
