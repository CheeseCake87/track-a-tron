import {SpinnerSmall, SpinnerWithMessage} from "../globals/Spinner";
import {LoremIpsum} from "../globals/LoremIpsum";
import {createSignal} from "solid-js";

export default function Index() {

    const [rangeValue, setRangeValue] = createSignal(0)

    return (
        <div className={'overflow-y-auto h-screen'}>
            <div className={'flex flex-col justify-center p-6 __elements__'}>

                <h4>Buttons</h4>
                <div className={'flex'}>
                    <div className={'p-2'}>
                        <p>btn</p>
                        <button className={'btn'} onClick={() => {
                        }}>submit
                        </button>
                    </div>
                    <div className={'p-2'}>
                        <p>btn-confirm</p>
                        <button className={'btn-confirm'} onClick={() => {
                        }}>submit
                        </button>
                    </div>
                    <div className={'p-2'}>
                        <p>btn-good</p>
                        <button className={'btn-good'} onClick={() => {
                        }}>submit
                        </button>
                    </div>
                    <div className={'p-2'}>
                        <p>btn-warning</p>
                        <button className={'btn-warning'} onClick={() => {
                        }}>submit
                        </button>
                    </div>
                    <div className={'p-2'}>
                        <p>btn-danger</p>
                        <button className={'btn-danger'} onClick={() => {
                        }}>submit
                        </button>
                    </div>
                </div>


                <h4>a Buttons</h4>
                <div className={'flex'}>
                    <div className={'p-2'}>
                        <p>btn</p>
                        <a className={'btn'} onClick={() => {
                        }}>submit</a>
                    </div>
                    <div className={'p-2'}>
                        <p>btn-confirm</p>
                        <a className={'btn-confirm'} onClick={() => {
                        }}>submit</a>
                    </div>
                    <div className={'p-2'}>
                        <p>btn-good</p>
                        <a className={'btn-good'} onClick={() => {
                        }}>submit</a>
                    </div>
                    <div className={'p-2'}>
                        <p>btn-warning</p>
                        <a className={'btn-warning'} onClick={() => {
                        }}>submit</a>
                    </div>
                    <div className={'p-2'}>
                        <p>btn-danger</p>
                        <a className={'btn-danger'} onClick={() => {
                        }}>submit</a>
                    </div>
                </div>

                <h4>input=submit Buttons</h4>
                <form>
                    <div className={'flex'}>
                        <div className={'p-2'}>
                            <p>btn</p>
                            <input type={'submit'} className={'btn'}/>
                        </div>
                        <div className={'p-2'}>
                            <p>btn-confirm</p>
                            <input type={'submit'} className={'btn-confirm'}/>
                        </div>
                        <div className={'p-2'}>
                            <p>btn-good</p>
                            <input type={'submit'} className={'btn-good'}/>
                        </div>
                        <div className={'p-2'}>
                            <p>btn-warning</p>
                            <input type={'submit'} className={'btn-warning'}/>
                        </div>
                        <div className={'p-2'}>
                            <p>btn-danger</p>
                            <input type={'submit'} className={'btn-danger'}/>
                        </div>
                    </div>
                </form>

                <h4>Forms</h4>

                {/* INPUTS */}

                <h5>Inputs</h5>
                <form>

                    <div className={'flex flex-wrap pb-4'}>
                        <div className={'p-2'}>
                            <label>text</label>
                            <input type={'text'}/>
                        </div>
                        <div className={'p-2'}>
                            <label>text required</label>
                            <input type={'text'} required/>
                        </div>
                        <div className={'p-2'}>
                            <label>password</label>
                            <input type={'password'}/>
                        </div>
                        <div className={'p-2'}>
                            <label>date</label>
                            <input type={'date'}/>
                        </div>
                        <div className={'p-2'}>
                            <label>datetime-local</label>
                            <input type={'datetime-local'}/>
                        </div>
                        <div className={'p-2'}>
                            <label>month</label>
                            <input type={'month'}/>
                        </div>
                        <div className={'p-2'}>
                            <label>week</label>
                            <input type={'week'}/>
                        </div>
                        <div className={'p-2'}>
                            <label>time</label>
                            <input type={'time'}/>
                        </div>
                        <div className={'p-2'}>
                            <label>number</label>
                            <input type={'number'}/>
                        </div>
                        <div className={'p-2'}>
                            <label>color</label>
                            <input type={'color'}/>
                        </div>
                        <div className={'p-2'}>
                            <label>email</label>
                            <input type={'email'}/>
                        </div>
                        <div className={'p-2'}>
                            <label>url</label>
                            <input type={'url'}/>
                        </div>
                        <div className={'p-2'}>
                            <label>tel</label>
                            <input type={'tel'}/>
                        </div>
                        <div className={'p-2'}>
                            <label>search</label>
                            <input type={'search'}/>
                        </div>

                    </div>

                    {/* RANGE */}

                    <div className={'flex flex-wrap pb-4'}>
                        <div className={'p-2'}>
                            <label>range with labels</label>
                            <div className={'range-labels'}>
                                <span>0</span>
                                <input
                                    type={'range'}
                                    value={rangeValue()}
                                    onInput={(e) => setRangeValue(e.target.value)}
                                    onChange={(e) => setRangeValue(e.target.value)}
                                    min={'0'}
                                    max={'100'}
                                    step={'1'}/>
                                <span>100</span>
                            </div>
                        </div>
                        <div className={'p-2'}>
                            <label>range with labels show value</label>
                            <div className={'range-labels'}>
                                <span>0</span>
                                <input
                                    onInput={(e) => setRangeValue(e.target.value)}
                                    onChange={(e) => setRangeValue(e.target.value)}
                                    type={'range'}
                                    value={rangeValue()}
                                    min={'0'}
                                    max={'100'}
                                    step={'1'}/>
                                <span>{rangeValue()}</span>
                                <span>100</span>
                            </div>
                        </div>
                        <div className={'p-2'}>
                            <label>range</label>
                            <input
                                type={'range'}
                                onInput={(e) => setRangeValue(e.target.value)}
                                onChange={(e) => setRangeValue(e.target.value)}
                                value={rangeValue()}
                                min={'0'}
                                max={'100'}
                                step={'1'}/>
                        </div>
                    </div>

                    {/* SELECT */}

                    <div className={'flex flex-wrap pb-4'}>
                        <div className={'p-2'}>
                            <label>select</label>
                            <select>
                                <option>Select...</option>
                                <option>option 1</option>
                                <option>option 2</option>
                                <option>option 3</option>
                            </select>
                        </div>
                        <div className={'p-2'}>
                            <label>select required</label>
                            <select required>
                                <option>Select...</option>
                                <option>option 1</option>
                                <option>option 2</option>
                                <option>option 3</option>
                            </select>
                        </div>
                    </div>

                    {/* SELECT LABEL */}

                    <div className={'flex flex-wrap pb-4'}>
                        <div className={'inline-label'}>
                            <label>select</label>
                            <select>
                                <option>Select...</option>
                                <option>option 1</option>
                                <option>option 2</option>
                                <option>option 3</option>
                            </select>
                        </div>
                    </div>

                    {/* FILE */}

                    <div className={'flex flex-wrap pb-4'}>
                        <div className={'p-2'}>
                            <label>file</label>
                            <input type={'file'}/>
                        </div>
                        <div className={'p-2'}>
                            <label>file required</label>
                            <input type={'file'} required/>
                        </div>
                    </div>

                    {/* RADIO */}

                    <div className={'flex flex-wrap pb-4'}>
                        <div className={'p-2'}>
                            <label>Radio</label>
                            <label htmlFor="value1"
                                   className={'radio-label'}>
                                <input type={'radio'}
                                       id={'value1'}
                                       name={'radio1'}
                                       value={'value1'}
                                       checked/>
                                value1
                            </label>
                            <label htmlFor="value2"
                                   className={'radio-label'}>
                                <input type={'radio'}
                                       id={'value2'}
                                       name={'radio1'}
                                       value={'value2'}/>
                                value2
                            </label>
                            <label htmlFor="value3"
                                   className={'radio-label'}>
                                <input type={'radio'}
                                       id={'value3'}
                                       name={'radio1'}
                                       value={'value3'}/>
                                value3
                            </label>
                        </div>
                        <div className={'p-2'}>
                            <label>Radio group col</label>
                            <div className={'radio-group-col'}>
                                <label htmlFor="value111"
                                       className={'radio-label'}>
                                    <input type={'radio'}
                                           id={'value111'}
                                           name={'radio111'}
                                           value={'value111'}
                                           checked/>
                                    value1
                                </label>
                                <label htmlFor="value222"
                                       className={'radio-label'}>
                                    <input type={'radio'}
                                           id={'value222'}
                                           name={'radio111'}
                                           value={'value222'}/>
                                    value2
                                </label>
                                <label htmlFor="value333"
                                       className={'radio-label'}>
                                    <input type={'radio'}
                                           id={'value333'}
                                           name={'radio111'}
                                           value={'value333'}/>
                                    value3
                                </label>
                            </div>
                        </div>
                        <div className={'p-2'}>
                            <label>Radio group row</label>
                            <div className={'radio-group-row'}>
                                <label htmlFor="value11"
                                       className={'radio-label'}>
                                    <input type={'radio'}
                                           id={'value11'}
                                           name={'radio11'}
                                           value={'value11'}
                                           checked/>
                                    value1
                                </label>
                                <label htmlFor="value22"
                                       className={'radio-label'}>
                                    <input type={'radio'}
                                           id={'value22'}
                                           name={'radio11'}
                                           value={'value22'}/>
                                    value2
                                </label>
                                <label htmlFor="value33"
                                       className={'radio-label'}>
                                    <input type={'radio'}
                                           id={'value33'}
                                           name={'radio11'}
                                           value={'value33'}/>
                                    value3
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* CHECKBOX */}

                    <div className={'flex flex-wrap pb-4'}>
                        <div className={'p-2'}>
                            <label>Checkbox</label>
                            <label htmlFor="check1"
                                   className={'checkbox'}>
                                <input type={'checkbox'}
                                       id={'check1'}
                                       name={'check1'}
                                       value={'check1'}
                                       checked/>
                                check1
                            </label>
                        </div>
                    </div>

                    {/*

<div class="checkbox-wrapper-2">
  <input type="checkbox" class="sc-gJwTLC ikxBAC">
</div>

<style>
  .checkbox-wrapper-2 .ikxBAC {
    appearance: none;
    background-color: #dfe1e4;
    border-radius: 72px;
    border-style: none;
    flex-shrink: 0;
    height: 20px;
    margin: 0;
    position: relative;
    width: 30px;
  }

  .checkbox-wrapper-2 .ikxBAC::before {
    bottom: -6px;
    content: "";
    left: -6px;
    position: absolute;
    right: -6px;
    top: -6px;
  }

  .checkbox-wrapper-2 .ikxBAC,
  .checkbox-wrapper-2 .ikxBAC::after {
    transition: all 100ms ease-out;
  }

  .checkbox-wrapper-2 .ikxBAC::after {
    background-color: #fff;
    border-radius: 50%;
    content: "";
    height: 14px;
    left: 3px;
    position: absolute;
    top: 3px;
    width: 14px;
  }

  .checkbox-wrapper-2 input[type=checkbox] {
    cursor: default;
  }

  .checkbox-wrapper-2 .ikxBAC:hover {
    background-color: #c9cbcd;
    transition-duration: 0s;
  }

  .checkbox-wrapper-2 .ikxBAC:checked {
    background-color: #6e79d6;
  }

  .checkbox-wrapper-2 .ikxBAC:checked::after {
    background-color: #fff;
    left: 13px;
  }

  .checkbox-wrapper-2 :focus:not(.focus-visible) {
    outline: 0;
  }

  .checkbox-wrapper-2 .ikxBAC:checked:hover {
    background-color: #535db3;
  }
</style>

                */}

                    {/* INLINE */}

                    <div className={'flex flex-col'}>
                        <div className={'p-2'}>
                            <div className={'inline-button'}>
                                <input type={'text'}/>
                                <button className={'btn-confirm'} onClick={() => {
                                }}>submit
                                </button>
                            </div>
                        </div>

                        <div className={'p-2'}>
                            <div className={'inline-label'}>
                                <label>inline label range with labels</label>
                                <div className={'range-labels'}>
                                    <span>0</span>
                                    <input
                                        type={'range'}
                                        value={rangeValue()}
                                        onInput={(e) => setRangeValue(e.target.value)}
                                        onChange={(e) => setRangeValue(e.target.value)}
                                        min={'0'}
                                        max={'100'}
                                        step={'1'}/>
                                    <span>100</span>
                                </div>
                            </div>
                        </div>

                        <div className={'p-2'}>
                            <div className={'inline-label'}>
                                <label>inline label range with labels show value</label>
                                <div className={'range-labels'}>
                                    <span>0</span>
                                    <input
                                        type={'range'}
                                        value={rangeValue()}
                                        onInput={(e) => setRangeValue(e.target.value)}
                                        onChange={(e) => setRangeValue(e.target.value)}
                                        min={'0'}
                                        max={'100'}
                                        step={'1'}/>
                                    <span>{rangeValue()}</span>
                                    <span>100</span>
                                </div>
                            </div>
                        </div>

                        <div className={'p-2'}>
                            <div className={'inline-label'}>
                                <label>In line Input</label>
                                <input type={'text'}/>
                            </div>
                        </div>

                        <div className={'p-2'}>
                            <div className={'inline-label'}>
                                <label>In line Input required</label>
                                <input type={'text'} required/>
                            </div>
                        </div>
                    </div>

                </form>


                {/* SPINNERS */}

                <h4>Spinners</h4>
                <div className={'p-2'}>
                    <h5>SpinnerSmall</h5>
                    <SpinnerSmall/>
                </div>
                <div className={'p-2'}>
                    <h5>SpinnerWithMessage</h5>
                    <SpinnerWithMessage message={'Loading message...'}/>
                </div>


                {/* TYPING */}

                <h4>Headers</h4>
                <div className={'p-2 flex flex-col'}>
                    <div className={'border w-full'}></div>
                    <h1>Header 1</h1>
                    <LoremIpsum/>
                    <h2>Header 2</h2>
                    <LoremIpsum/>
                    <h3>Header 3</h3>
                    <LoremIpsum/>
                    <h4>Header 4</h4>
                    <LoremIpsum/>
                    <h5>Header 5</h5>
                    <LoremIpsum/>
                    <h6>Header 6</h6>
                    <LoremIpsum/>
                </div>
                <div className={'p-2 flex flex-col gap-2'}>
                    <p>Paragraph</p>
                </div>

                <h4>Attention</h4>
                <div className={'__attention__'}>
                    <div className={'attention'}>
                        <h6>attention</h6>
                        <LoremIpsum/>
                    </div>

                    <div className={'attention-confirm'}>
                        <h6>attention-confirm</h6>
                        <LoremIpsum/>
                    </div>

                    <div className={'attention-warning'}>
                        <h6>attention-warning</h6>
                        <LoremIpsum/>
                    </div>

                    <div className={'attention-danger'}>
                        <h6>attention-danger</h6>
                        <LoremIpsum/>
                    </div>
                </div>
            </div>
        </div>
    )
};
