import React, { useEffect, useRef, useState } from 'react';
import { Component as Wiremark } from './component.js';

export default function Editor(props) {

  const domElement = useRef();

  const [text, setText] =  useState(window.localStorage.getItem('wiremarks-state') || '');
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(setup, []);
  useEffect(store, [text]);

  function setup() {
    resize();
    window.addEventListener('resize', resize, false);
    return unmount;
  }

  function resize() {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }

  function unmount() {
    window.removeEventListener('resize', resize, false);
  }

  function update(e) {
    const value = e.target.value;
    setText(value);
  }

  function store() {
    window.localStorage.setItem('wiremarks-state', text);
  }

  //

  function open() {
    setIsOpen(true);
    requestAnimationFrame(select);
  }
  function close() {
    setIsOpen(false);
  }
  function select() {
    const selector = 'div.panel textarea';
    const textarea = domElement.current.querySelector(selector);
    textarea.focus();
  }

  return (
    <div ref={ domElement } className={ ['editor', isOpen ? 'writing' : ''].join(' ') }>
      <div className="stage">
        <Wiremark instructions={ text } width={ width } height={ height } />
      </div>
      <div className="ui">
        <div className="open button" onClick={ open }>
          Open Instructions
        </div>
        <div className="panel">
          <div className="close button" onClick={ close }>✕</div>
          <textarea onChange={ update } defaultValue={ text } />
        </div>
      </div>
    </div>
  );

}