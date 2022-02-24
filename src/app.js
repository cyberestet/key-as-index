import React, { PureComponent } from "react";
import './app.css'


export default class App extends PureComponent {
  state = {
    nextItemId: 0,
    items: [],
    isDescending: true,
    isIndexKey: true
  }
  removeItem = (id) => {
    const filteredResult = this.state.items.filter(val => val.id !== id);
    this.setState({ items: filteredResult });
  }
  sortItems = () => {
    const sortedList = this.state.items.sort((a, b) => {
      return this.state.isDescending ? a.id - b.id : b.id - a.id;
    });
    this.setState({
      items: [...sortedList],
      isDescending: !this.state.isDescending
    });
  }

  addNewItem = () => {
    this.setState((prevState) => {
      return {
        items: [{ id: prevState.nextItemId }, ...prevState.items],
        nextItemId: prevState.nextItemId + 1
      }
    })
  };

  render() {
    const { items, isIndexKey } = this.state;

    return (
      <div className="base-container">
        <div className="controllers">
          <button className="big-btn" onClick={this.addNewItem}>Add new chicken</button>
          <button className="big-btn" onClick={this.sortItems} >Sort</button>
          <span className="toggle-container big-btn">
            <label htmlFor="checkbox" >Index key</label>
            <input className="toggle" type="checkbox" defaultChecked={isIndexKey}
              onClick={() => this.setState({ isIndexKey: !isIndexKey })} />
          </span>
        </div>
        <div className="chickens-container"> 
          {items.map(({ id }, idx) => <Chicken id={id} key={isIndexKey ? idx : id} removeItem={this.removeItem} />)}
        </div>
      </div>

    );
  }

}



class Chicken extends PureComponent {

  componentDidMount() {
    console.log(`Mount chicken ${this.props.id}`);
  }
  componentDidUpdate(prevProps) {
    console.log(`Update chicken old ${prevProps.id} new ${this.props.id}`);
  }
  componentWillUnmount() {
    console.log(`Unmount chicken ${this.props.id}`);
  }
  render() {
    const { id, removeItem } = this.props;
    return <div className="item-container" >
      <label >Chicken {id} </label>
      <input />
      <button onClick={() => removeItem(id)}>Remove</button>
    </div>
  }
}