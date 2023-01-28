export type ShowMoreButtonTextOptions = {
  /**
   * Whether the widget is showing more items or not.
   */
  isShowingMore: boolean;
};

export type ShowMoreButtonTranslations = {
  /**
   * Alternative text for the "Show more" button.
   */
  showMoreButtonText(options: ShowMoreButtonTextOptions): string;
};
