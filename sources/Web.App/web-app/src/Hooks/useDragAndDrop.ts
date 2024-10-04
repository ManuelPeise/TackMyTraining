import React from 'react';

export const useDragAndDrop = () => {
  const [currentElement, setCurrentElement] = React.useState<{ id: string; element: HTMLDivElement } | null>(null);

  const onDragOver = React.useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    console.log('Drag Over', event.currentTarget.id);
  }, []);

  const onDragStart = React.useCallback((event: React.DragEvent<HTMLDivElement>) => {
    // event.dataTransfer.setData('', event.currentTarget.id);
    setCurrentElement({ id: event.currentTarget.id, element: event.currentTarget });
  }, []);

  const onDrop = React.useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      console.log('Drop ', event.currentTarget.id);
      event.currentTarget.appendChild(currentElement.element);
      setCurrentElement(null);
    },
    [currentElement]
  );

  return {
    onDragOver,
    onDragStart,
    onDrop,
  };
};
