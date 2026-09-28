/**
 * String utilities for answer normalization and comparison in trivia rounds.
  *
   * Used to determine whether a player's typed answer matches the canonical
    * answer or any of the acceptable alternatives. Handles common variations
     * like casing, leading articles, extra whitespace, and accented characters.
      */

      /** Articles and filler words stripped during normalization. */
      const STRIP_WORDS = ['the', 'a', 'an'] as const;

      /** Characters treated as equivalent to empty during comparison. */
      const IGNORED_CHARS = /[''\-.\/,!?()\[\]{}"]/g;

      /**
       * Normalize a string for fuzzy answer comparison.
        *
         * Steps:
          * 1. Trim leading/trailing whitespace
           * 2. Convert to lowercase
            * 3. Replace accented characters with ASCII equivalents
             * 4. Strip punctuation and special characters
              * 5. Collapse multiple spaces into one
               * 6. Optionally remove leading articles ("the", "a", "an")
                *
                 * @param input - The raw input string.
                  * @param stripArticles - Whether to remove leading articles. Defaults to true.
                   * @returns The normalized string.
                    */
                    export function normalizeAnswer(
                      input: string,
                        stripArticles = true,
                        ): string {
                          let normalized = input
                              .trim()
                                  .toLowerCase()
                                      .normalize('NFD')
                                          .replace(/[̀-ͯ]/g, '') // strip diacritics
                                              .replace(IGNORED_CHARS, '')
                                                  .replace(/\s+/g, ' ')
                                                      .trim();

                                                        if (stripArticles) {
                                                            for (const article of STRIP_WORDS) {
                                                                  if (normalized.startsWith(`${article} `)) {
                                                                          normalized = normalized.slice(article.length + 1);
                                                                                  break; // only strip the first leading article
                                                                                        }
                                                                                            }
                                                                                              }

                                                                                                return normalized;
                                                                                                }

                                                                                                /**
                                                                                                 * Check whether a player's answer matches the expected answer.
                                                                                                  *
                                                                                                   * Compares the normalized forms of both strings. If `acceptableAnswers`
                                                                                                    * are provided, matches against those as well.
                                                                                                     *
                                                                                                      * @param playerAnswer - What the player typed.
                                                                                                       * @param correctAnswer - The canonical correct answer.
                                                                                                        * @param acceptableAnswers - Alternative phrasings that should also be accepted.
                                                                                                         * @returns `true` if the answer is considered correct.
                                                                                                          */
                                                                                                          export function isAnswerCorrect(
                                                                                                            playerAnswer: string,
                                                                                                              correctAnswer: string,
                                                                                                                acceptableAnswers: string[] = [],
                                                                                                                ): boolean {
                                                                                                                  const normalizedPlayer = normalizeAnswer(playerAnswer);
                                                                                                                    const candidates = [correctAnswer, ...acceptableAnswers];
                                                                                                                    
                                                                                                                      return candidates.some(
                                                                                                                          (candidate) => normalizeAnswer(candidate) === normalizedPlayer,
                                                                                                                            );
                                                                                                                            }
                                                                                                                            
                                                                                                                            /**
                                                                                                                             * Compute a basic similarity ratio between two strings using
                                                                                                                              * longest-common-subsequence length divided by the longer string's length.
                                                                                                                               *
                                                                                                                                * Useful for providing "close!" feedback when a player's answer is
                                                                                                                                 * almost correct (e.g., a minor typo).
                                                                                                                                  *
                                                                                                                                   * @param a - First string (already normalized recommended).
                                                                                                                                    * @param b - Second string (already normalized recommended).
                                                                                                                                     * @returns A number between 0 and 1, where 1 means identical.
                                                                                                                                      */
                                                                                                                                      export function similarityRatio(a: string, b: string): number {
                                                                                                                                        if (a === b) return 1;
                                                                                                                                          if (a.length === 0 || b.length === 0) return 0;
                                                                                                                                          
                                                                                                                                            // LCS via dynamic programming (space-optimized to two rows)
                                                                                                                                              const m = a.length;
                                                                                                                                                const n = b.length;
                                                                                                                                                  let prev = new Array<number>(n + 1).fill(0);
                                                                                                                                                    let curr = new Array<number>(n + 1).fill(0);
                                                                                                                                                    
                                                                                                                                                      for (let i = 1; i <= m; i++) {
                                                                                                                                                          for (let j = 1; j <= n; j++) {
                                                                                                                                                                curr[j] =
                                                                                                                                                                        a[i - 1] === b[j - 1]
                                                                                                                                                                                ? prev[j - 1] + 1
                                                                                                                                                                                          : Math.max(prev[j], curr[j - 1]);
                                                                                                                                                                                              }
                                                                                                                                                                                                  [prev, curr] = [curr, prev];
                                                                                                                                                                                                      curr.fill(0);
                                                                                                                                                                                                        }
                                                                                                                                                                                                        
                                                                                                                                                                                                          const lcsLength = prev[n];
                                                                                                                                                                                                            return lcsLength / Math.max(m, n);
                                                                                                                                                                                                            }
                                                                                                                                                                                                            
                                                                                                                                                                                                            /**
                                                                                                                                                                                                             * Threshold above which a wrong answer is considered "close" (for UI hints).
                                                                                                                                                                                                              * A ratio of 0.8 catches most single-character typos in answers
                                                                                                                                                                                                               * that are at least 5 characters long.
                                                                                                                                                                                                                */
                                                                                                                                                                                                                export const CLOSE_ANSWER_THRESHOLD = 0.8;
                                                                                                                                                                                                                
                                                                                                                                                                                                                /**
                                                                                                                                                                                                                 * Determine if a wrong answer was close enough to show a hint.
                                                                                                                                                                                                                  *
                                                                                                                                                                                                                   * @param playerAnswer - What the player typed.
                                                                                                                                                                                                                    * @param correctAnswer - The canonical correct answer.
                                                                                                                                                                                                                     * @returns `true` if the similarity exceeds CLOSE_ANSWER_THRESHOLD.
                                                                                                                                                                                                                      */
                                                                                                                                                                                                                      export function isCloseAnswer(
                                                                                                                                                                                                                        playerAnswer: string,
                                                                                                                                                                                                                          correctAnswer: string,
                                                                                                                                                                                                                          ): boolean {
                                                                                                                                                                                                                            return (
                                                                                                                                                                                                                                similarityRatio(
                                                                                                                                                                                                                                      normalizeAnswer(playerAnswer),
                                                                                                                                                                                                                                            normalizeAnswer(correctAnswer),
                                                                                                                                                                                                                                                ) >= CLOSE_ANSWER_THRESHOLD
                                                                                                                                                                                                                                                  );
                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                  
