import React from 'react';
import PropTypes from 'prop-types';

class RightClick extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            placed: true,
            styles: {
                position: "absolute",
                top: 0,
                left: 0,
                display: "none",
                width: this.props.width||"300px"
            },
            menu:""
        }
        
        this.replaceMenu = this.replaceMenu.bind(this);
        this.toggleRightClickMenu = this.toggleRightClickMenu.bind(this);
        
        this.defaults = {
            menuClass: "r_menu",
            itemClass: "item"
        }
        
    }

    keyGenerator() {
        return 'xxxxxxyxxxxxxxxyxxxxxxxxxxxxyxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }
    
    createMenu(items) {
        var menu = [
            <div key={this.keyGenerator()} className={this.defaults.itemClass} onClick={()=>this.emit(1)}>Print...</div>,
            <div key={this.keyGenerator()} className={this.defaults.itemClass} onClick={()=>this.emit(2)}>Reload...</div>,
            <div key={this.keyGenerator()} className={this.defaults.itemClass} onClick={()=>this.emit(3)}>Back...</div>,
            <div key={this.keyGenerator()} className={this.defaults.itemClass} onClick={()=>this.emit(4)}>Forward...</div>,
        ]

        if(items !== null && items !== undefined) {
            for(var keys in items) {
                var title = items[keys].title
                menu.push(<button key={this.keyGenerator()} className={this.defaults.itemClass} {...items[keys]}>{title}</button>)
            }
        }
        
        return menu
    }
    
    toggleRightClickMenu(x,y,display,menu) {
        var new_styles = {...this.state.styles}
        new_styles.top = y;
        new_styles.left = x;
        new_styles.display = display;

        this.setState({
            menu: menu,
            styles: new_styles
        })
    }
    
    replaceMenu(e) {
//        e.persist();
        e.preventDefault();
        console.log(1,document.elementFromPoint(e.pageX,e.pageY));
        console.log(2,this.props.itemID);
        console.log(3,e.target);
        var rid = null, element = document.elementFromPoint(e.pageX,e.pageY),childElementsParent;
        
        if(element !== null) {
            childElementsParent = this.getClosestParent(document.elementFromPoint(e.pageX,e.pageY),this.props['relative-parent-id']);
        } 
  
        if(childElementsParent !== undefined && childElementsParent !== null && childElementsParent.dataset ) {
            console.log('child parents...',childElementsParent);
            console.log('child parents.. tran...',childElementsParent.dataset.rightClickId);
            rid = childElementsParent.dataset.rightClickId || element.dataset.rightClickId;
        }
       
        var menu =  ((typeof this.props.menu === 'function')? this.props.menu(rid) : this.props.menu);
        
        this.toggleRightClickMenu(e.pageX,e.pageY,"block",menu);     
    }
    
    getClosestParent(element,item_id) {
        console.log(element)
        if(!Element.prototype.matches) {
            Element.prototype.matches = Element.prototype.msMatchesSelector ||
                Element.prototype.webkitMatchesSelector;
        }

        if(!Element.prototype.closest) {
            Element.prototype.closest = function(s) {
                var el = this;
                if(!document.documentElement.contains(el)) return null;

                do {
                    if(el.matches(s)) return el;
                    console.log(el);
                    el = el.parentElement;
                } while (el !== null);

                return null;
            }
        }

        return element.closest(item_id);
    }

    emit(item) {
        console.log(item);
        console.log(item === 1);
        if(item === 1) {
            return window.print();
        } else if (item === 2) {
            return window.location.reload();
        }else if (item === 3) {
            return window.history.back();
        }else if (item === 4) {
            return window.history.forward();
        } 
    }
    
    componentWillReceiveProps(nextProps) {
        if(nextProps.e !== null && nextProps.e !== undefined) {
            console.log('should update...',nextProps.e);
            this.replaceMenu(nextProps.e);
        } 
    }

    render() {
        
        if(this.props.e === null || this.props.e === undefined) {
            return "";
        }
        
        const items = (typeof this.props.menuItems === 'object')?this.props.menuItems : "" || this.state.items;
        
        return (
            <div style={this.state.styles} className={this.defaults.menuClass} id="right_click" >
                {this.createMenu(items)}
                {this.props.children || this.state.menu}
            </div>
        )
    }
}

RightClick.propTypes = {
    e: PropTypes.any,
    "relative-parent-id": PropTypes.string,
    menu: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.element
    ])
}

export default RightClick;
