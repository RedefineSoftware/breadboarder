export type BbmlScreenName = string;
export type BbmlComponentName = string;

export enum BbmlItemType {
  Screen = 'screen',
  Button = 'button',
  Label = 'label',
  Field = 'field',
  Component = 'component',
  GoTo = 'goto',
  Conditional = 'conditional',
  Comment = 'comment',
}

export interface BbmlScreen {
  type: BbmlItemType.Screen;
  name: string;
  items: BbmlScreenItem[];
}

export interface BbmlButton {
  type: BbmlItemType.Button;
  label: string;
  destination: BbmlScreenName;
}

export interface BbmlLabel {
  type: BbmlItemType.Label;
  value: string;
}

export interface BbmlField {
  type: BbmlItemType.Field;
  label: string;
}

export interface BbmlComponent {
  type: BbmlItemType.Component;
  name: string;
}

export interface BbmlGoTo {
  type: BbmlItemType.GoTo;
  destination: BbmlScreenName;
}

export type BbmlCondition = string;

export interface BbmlConditional {
  type: BbmlItemType.Conditional;
  condition: BbmlCondition;
  ifItems: BbmlScreenItem[] | null | undefined;
  elseItems: BbmlScreenItem[] | null | undefined;
}

export interface BbmlComment {
  type: BbmlItemType.Comment;
  value: string;
}


export type BbmlScreenItem = 
  BbmlButton
  | BbmlLabel
  | BbmlField
  | BbmlComponent
  | BbmlGoTo
  | BbmlConditional
  | BbmlComment;

export type BbmlSyntaxTree = BbmlScreen[];

