import assert from "assert";
import { Problem } from "@/types/problems";

const starterCodeTwoSum = `function twoSum(nums,target){
  // Write your code here
};`;

// checks if the user has the correct code
const handlerTwoSum = (fn: any) => {
	// fn is the callback that user's code is passed into
	try {
		const nums = [
			[2, 7, 11, 15],
			[3, 2, 4],
			[3, 3],
		];

		const targets = [9, 6, 6];
		const answers = [
			[0, 1],
			[1, 2],
			[0, 1],
		];

		// loop all tests to check if the user's code is correct
		for (let i = 0; i < nums.length; i++) {
			// result is the output of the user's function and answer is the expected output
			const result = fn(nums[i], targets[i]);
			assert.deepStrictEqual(result, answers[i]);
		}
		return true;
	} catch (error: any) {
		console.log("twoSum handler function error");
		throw new Error(error);
	}
};

const runTwoSum = (fn: any) => {
	try {
		const testResults = [] as { case: number; passed: boolean; input: any; expectedOutput: string; actualOutput: string }[];
		const targets = [9, 6, 6];
		const tests = [
			[2, 7, 11, 15],
			[3, 2, 4],
			[3, 3],
		];
		const answers = [
			[0, 1],
			[1, 2],
			[0, 1],
		];
		for (let i = 0; i < tests.length; i++) {
			const result = fn(tests[i], targets[i]);
			console.log('result: ', result);
			try {
				assert.deepStrictEqual(result, answers[i]);

					// add test result
				testResults.push({
					case: i + 1,
					passed: JSON.stringify(result) === JSON.stringify(answers[i]),
					input: "nums: " + tests[i] + ", target: " + targets[i],
					expectedOutput: answers[i].toString(),
					actualOutput: JSON.stringify(result)
				});
			} catch (error: any) {
				console.error("Error from twoSumRun: ", error);
				// throw new Error(error);

				// add test result
				testResults.push({
					case: i + 1,
					passed: JSON.stringify(result) === JSON.stringify(answers[i]),
					input: "nums: " + tests[i] + ", target: " + targets[i],
					expectedOutput: answers[i].toString(),
					actualOutput: JSON.stringify(result)
				});
			}
		}
		return testResults;
	} catch (error: any) {
		console.log("twoSum handler function error");
		throw new Error(error);
	}
}

export const twoSum: Problem = {
	id: "two-sum",
	title: "1. Two Sum",
	problemStatement: `<p class='mt-3'>
	Given an array of integers <code>nums</code> and an integer <code>target</code>, return
	<em>indices of the two numbers such that they add up to</em> <code>target</code>.
</p>
<p class='mt-3'>
	You may assume that each input would have <strong>exactly one solution</strong>, and you
	may not use thesame element twice.
</p>
<p class='mt-3'>You can return the answer in any order.</p>`,
	examples: [
		{
			id: 1,
			inputText: "nums = [2,7,11,15], target = 9",
			outputText: "[0,1]",
			explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
		},
		{
			id: 2,
			inputText: "nums = [3,2,4], target = 6",
			outputText: "[1,2]",
			explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
		},
		{
			id: 3,
			inputText: " nums = [3,3], target = 6",
			outputText: "[0,1]",
		},
	],
	constraints: 
    `<li class='mt-2'>
        <code>2 ≤ nums.length ≤ 10</code>
        </li> <li class='mt-2'>
        <code>-10 ≤ nums[i] ≤ 10</code>
        </li> <li class='mt-2'>
        <code>-10 ≤ target ≤ 10</code>
        </li>
        <li class='mt-2 text-sm'>
        <strong>Only one valid answer exists.</strong>
    </li>`,
	handlerFunction: handlerTwoSum,
	handlerRun: runTwoSum,
	starterCode: starterCodeTwoSum,
	order: 1,
	starterFunctionName: "function twoSum(",
};
