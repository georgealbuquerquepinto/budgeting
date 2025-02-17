/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import {
  Row,
  Col,
  Card,
  InputNumber,
  Button,
} from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Budget from './budget';
import data from '../_utils/data';
import { formatCurrency } from '../_utils/constats';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const id2List = {
  droppable: 'items',
  droppable2: 'selected',
};

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: data,
      selected: [],
      buildBudget: false,
    };

    this.onDragEnd = this.onDragEnd.bind(this);
    this.updateAmount = this.updateAmount.bind(this);
    this.newBudget = this.newBudget.bind(this);
  }

  onDragEnd(result) {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const items = reorder(this.getList(source.droppableId), source.index, destination.index);

      let state = { items };

      if (source.droppableId === 'droppable2') {
        state = { selected: items };
      }

      this.setState(state);
    } else {
      const newResult = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination,
      );

      if (destination.droppableId === 'droppable2') {
        const index = newResult.droppable2.findIndex((item) => item.id === result.draggableId);
        newResult.droppable2[index].amount = 1;
      }

      this.setState({ items: newResult.droppable, selected: newResult.droppable2 });
    }
  }

  getList(id) {
    // eslint-disable-next-line react/destructuring-assignment
    return this.state[id2List[id]];
  }

  updateAmount(index, value) {
    const { selected } = this.state;

    selected[index].amount = value;

    this.setState({ selected });
  }

  newBudget() {
    this.setState({ items: data, selected: [], buildBudget: false });
  }

  render() {
    const { items, selected, buildBudget } = this.state;

    return (
      <>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Row type='flex' style={{ width: '100%' }}>
            <Col span={12} style={{ padding: '3% 1.5% 0.5% 3%' }}>
              <Card title='Itens disponíveis' bordered={false} headStyle={{ fontWeight: 600, fontSize: '20px', color: '#8C52FF' }} bodyStyle={{ height: 'inherit' }} style={{ minHeight: '100%' }}>
                <Droppable droppableId='droppable'>
                  {(provided) => (
                    <div ref={provided.innerRef} className='droppable-env'>
                      {
                        items.length
                          ? items.map((item, index) => (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                              isDragDisabled={buildBudget}
                            >
                              {(pvd, snp) => (
                                <div
                                  ref={pvd.innerRef}
                                  // eslint-disable-next-line react/jsx-props-no-spreading
                                  {...pvd.draggableProps}
                                  // eslint-disable-next-line react/jsx-props-no-spreading
                                  {...pvd.dragHandleProps}
                                  className='card-item'
                                  style={{ ...pvd.draggableProps.style, background: snp.isDragging ? '#F4F4F4' : '#FFF' }}
                                >
                                  <p className='card-item-title'>
                                    { `${item.name}` }
                                    <span className='card-item-value'>
                                      {`R$ ${formatCurrency(item.value)}`}
                                    </span>
                                  </p>
                                  <p className='card-item-description'>{ `${item.description}` }</p>
                                </div>
                              )}
                            </Draggable>
                          ))
                          : (
                            <div className='empty-env'>
                              <p>Nenhum item disponível.</p>
                            </div>
                          )
                        }
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Card>
            </Col>
            <Col span={12} style={{ padding: '3% 3% 0.5% 1.5%' }}>
              <Card title='Itens selecionados' bordered={false} headStyle={{ fontWeight: 600, fontSize: '20px', color: '#8C52FF' }} bodyStyle={{ height: 'inherit' }} style={{ minHeight: '100%' }}>
                <Droppable droppableId='droppable2'>
                  {(provided) => (
                    <div ref={provided.innerRef} className='droppable-env'>
                      {
                        selected.length
                          ? selected.map((item, index) => (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                              isDragDisabled={buildBudget}
                            >
                              {(pvd, snp) => (
                                <div
                                  ref={pvd.innerRef}
                                  // eslint-disable-next-line react/jsx-props-no-spreading
                                  {...pvd.draggableProps}
                                  // eslint-disable-next-line react/jsx-props-no-spreading
                                  {...pvd.dragHandleProps}
                                  className='card-item'
                                  style={{ ...pvd.draggableProps.style, background: snp.isDragging ? '#F4F4F4' : '#FFF' }}
                                >
                                  <Row>
                                    <Col span={18}>
                                      <p className='card-item-title'>{ `${item.name} (R$ ${formatCurrency(item.value)})` }</p>
                                      <p className='card-item-description'>{ `${item.description}` }</p>
                                    </Col>
                                    <Col span={6}>
                                      <span style={{ fontSize: '8.5pt' }}>Quantidade</span>
                                      <InputNumber min={1} defaultValue={1} size='small' onChange={(value) => this.updateAmount(index, value)} />
                                    </Col>
                                  </Row>
                                </div>
                              )}
                            </Draggable>
                          ))
                          : (
                            <div className='empty-env'>
                              <p>Nenhum item selecionado.</p>
                            </div>
                          )
                      }
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                <p className='value-total'>{`Total: R$ ${formatCurrency(selected.reduce((a, b) => a + (b.value * b.amount || 0), 0))}`}</p>
              </Card>
            </Col>
          </Row>
          <Row type='flex' align='middle'>
            <Col span={12} style={{ textAlign: 'center', padding: '0.5% 1.5% 3% 3%' }}>
              {
                buildBudget === false
                  ? <Button type='primary' size='large' icon='build' shape='round' disabled={selected.length === 0} onClick={() => this.setState({ buildBudget: true })}>Gerar orçamento</Button>
                  : <Button type='primary' size='large' icon='plus' shape='round' onClick={this.newBudget}>Novo orçamento</Button>
              }
            </Col>
            <Col span={12} style={{ textAlign: 'center', padding: '0.5% 3% 3% 1.5%' }}>
              {
                buildBudget
                && <Budget items={selected} />
              }
            </Col>
          </Row>
        </DragDropContext>
      </>
    );
  }
}
