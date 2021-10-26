import { BbmlItemType, BbmlScreenItem } from './ast.model';

export function findOutgoingNodes(items: BbmlScreenItem[]) {
  let destinations: string[] = [];

  if (items && items.length) {
    for (let item of items) {
      if (item.type === BbmlItemType.Button) {
        destinations = destinations.concat(item.destination);
      }

      if (item.type === BbmlItemType.Conditional) {
        destinations = destinations.concat(findOutgoingNodes(item.ifItems || []))
        destinations = destinations.concat(findOutgoingNodes(item.elseItems || []))
      }
    }
  }

  return destinations;
}