Country Search — Design Decisions

1. Request Cancellation and Race Condition Prevention

Country Search uses AbortController to cancel outdated API requests.

Each time the user changes the search input, the currently active request is cancelled immediately using currentController?.abort().

This approach is important because multiple asynchronous requests may finish in a different order from the order in which they started.

For example:

The user searches for "Germany".

The request for Germany starts.

The user changes the input to "France".

The Germany request is immediately cancelled.

After the debounce delay, a new request for France starts.

2. Debounce Delay

The application uses a debounce delay of 300 milliseconds.

const handleSearch = debounce(performSearch, 300);

The timer resets whenever the user changes the input.

A search begins only after the user stops typing for 300 milliseconds.

3. Time Complexity (Big O)

debounce()

File: src/utils/debounce.ts
Time complexity per invocation: O(1).

4. Clean Code Principles

Single Responsibility Principle (SRP)

Each module has a clearly defined responsibility.
DRY — Don't Repeat Yourself

Country cards are created through the reusable createCountryCard() function rather than duplicating DOM creation code inside main.ts.
