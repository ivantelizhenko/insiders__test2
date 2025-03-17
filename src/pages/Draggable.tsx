import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { ReactNode } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 16px 20px 16px 46px;
  border-radius: 4px;
  height: 48px;
  width: fit-content;

  background-color: #e5e5e5;
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: space-between;
  position: relative;

  font-size: 1.4rem;
  font-weight: 500;

  &:hover {
    background-color: hsla(204, 29%, 97%, 1);
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

  &:hover {
    background-color: hsla(0, 84%, 59%, 1);
  }
`;

function Draggable({
  children,
  id,
}: {
  children: ReactNode;
  id: UniqueIdentifier;
}) {
  const { transform, setNodeRef, listeners, attributes } = useSortable({
    id: id,
  });

  const style = transform
    ? {
        opacity: '50%',
      }
    : undefined;

  return (
    <Wrapper ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <p>{children}</p>
      <ButtonClose>×</ButtonClose>
    </Wrapper>
  );
}

export default Draggable;
