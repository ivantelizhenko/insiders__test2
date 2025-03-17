import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { useTabs } from '../store/TabsContext';
import { Link } from 'react-router';

const Wrapper = styled(Link)`
  padding: 16px 20px 16px 46px;
  height: 48px;
  width: fit-content;

  cursor: pointer;
  color: hsla(214, 6%, 53%, 1);
  background-color: #fff;
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: space-between;
  position: relative;

  font-size: 1.4rem;
  font-weight: 500;

  &:hover {
    background-color: hsla(206, 33%, 96%, 1);
    color: #000;
    cursor: pointer;
  }

  &:active {
    background-color: hsla(214, 6%, 53%, 1);
    color: hsla(204, 29%, 97%, 1);
  }
`;

const ButtonClose = styled.button`
  background-color: transparent;
  top: 0;
  bottom: 0;
  right: 5px;
  margin: auto 0;

  border: none;
  position: absolute;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
  color: transparent;
  z-index: 100;

  &:hover {
    background-color: hsla(0, 84%, 59%, 1);
    color: inherit;
  }
`;

function Draggable({
  children,
  id,
}: {
  children: ReactNode;
  id: UniqueIdentifier;
}) {
  const { removeTab } = useTabs();
  const { transform, setNodeRef, listeners, attributes } = useSortable({
    id: id,
    data: {
      dragIgnoreAttribute: 'data-drag-ignore',
    },
  });

  const style = transform
    ? {
        opacity: '50%',
      }
    : undefined;

  function handleDeleteTab() {
    removeTab(id);
  }

  return (
    <Wrapper
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      to={`${id}`}
    >
      <p>{children}</p>
      <ButtonClose data-drag-ignore onClick={handleDeleteTab}>
        ×
      </ButtonClose>
    </Wrapper>
  );
}

export default Draggable;
