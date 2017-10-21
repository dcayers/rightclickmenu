import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import RightClick from './RightClick'; 

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: {
                e: null,
                e2: null,
            }
        }
    }  

    createTestMenu() {
        return (
            <ul>
                <li><h2 onClick={()=>{console.log('test menu item 1 clicked!')}}>Test 1</h2></li>
                <li><h2 onClick={()=>{console.log('test menu item 2 clicked!')}}>Test 2</h2></li>
                <li><h2 onClick={()=>{console.log('test menu item 3 clicked!')}}>Test 3</h2></li>
                <li><h2 onClick={()=>{console.log('test menu item 4 clicked!')}}>Test 4</h2></li>
                <li><h2 onClick={()=>{console.log('test menu item 5 clicked!')}}>Test 5</h2></li>
            </ul>
        )
    }    

    render() {
        return (
            <div id="parent" className="App" onClick={()=>{this.setState({events:{}})}} data-right-click-id="1">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <div className="App-intro" id="p_tag"  onContextMenu={(e)=>{ e.persist(); console.log('do something?',e); this.setState({events:{e:e}}); }} data-right-click-id="2">
                    To get started, edit <code>src/App.js</code> and save to reload.
                    <RightClick e={this.state.events.e} relative-parent-id="#parent" menu={this.createTestMenu}/>
                </div>

                <div className="App-intro" id="p_tag2"  onContextMenu={(e)=>{ e.persist(); console.log('do something?',e); this.setState({events:{e2:e}}); }} data-right-click-id="3">
                    <div>
                        To get started, edit <code>src/App.js</code> and save to reload.
                        <RightClick e={this.state.events.e2} relative-parent-id="#p_tag2" menu={<h4 onClick={()=>{console.log('string')}}>Test</h4>}/>
                    </div>
                    
                </div>

                <div className="App-intro" id="p_tag3"  onContextMenu={(e)=>{ e.persist(); console.log('do something?',e); this.setState({events:{e3:e}}); }} data-right-click-id="3">
                    To get started, edit <code>src/App.js</code> and save to reload.
                    <ul>
                        <li data-right-click-id="0-1" className="p_tags"><div>Tran No: 0-1</div></li>
                        <li data-right-click-id="0-2" className="p_tags"><div>Tran No: 0-2</div></li>
                        <li data-right-click-id="0-3" className="p_tags"><div>Tran No: 0-3</div></li>
                        <li data-right-click-id="0-4" className="p_tags"><div>Tran No: 0-4</div></li>
                    </ul>
                    
                    <RightClick e={this.state.events.e3} relative-parent-id=".p_tags" menuItems={{randomItem:{ title: "this is a button", onClick: ()=>console.log('I was clicked!')}}}/>
                </div>
            <pre style={{textAlign:"left"}}>
                { `
                    RightClick.propTypes = {
                        e: PropTypes.any,                       // contextmenu event
                            "relative-parent-id": PropTypes.string, // any css selector
                                menu: PropTypes.oneOfType([
                                    PropTypes.func,                     // function that returns html markup
                                    PropTypes.element                   // html markup
                                ])
                    }

                    this.state = {
                        events: {
                            e: null
                        }
                    };


                    <div id="p_tag" onContextMenu={(e) => { e.persist(); this.setState({events:{e:e}});}} data-right-click-id="2">

                        <RightClick e={this.state.events.e} relative-parent-id="#p_tag" menu={this.createTestMenu}/>

                    </div>
                `} 
                </pre>    
            </div>
        );
    }
}

export default App;
