<script>
	import { onMount } from "svelte";
	import data from "./data.json";

	let l = data[""].label[""];
	let q = data[""].q;

	const price = (number) => {
		number = Number(number);
		if (number == 0 || isNaN(number)) {
			return "";
		}
		return number.toLocaleString(q.lang ? q.lang : undefined, {
			minimumFractionDigits: 2,
		});
	};
	const qty = (number) => {
		number = Number(number);
		if (number == 0 || isNaN(number)) {
			return "";
		}
		return number.toLocaleString(q.lang ? q.lang : undefined, {
			minimumFractionDigits: 0,
		});
	};
	const date = (d) => {
		d = new Date(d).toLocaleDateString(q.lang ? q.lang : undefined, {
			month: "short",
			year: "numeric",
			day: "numeric",
		});
		return d;
	};
	const rate = (rate) => {
		rate = Number(rate) * 100;
		if (!Number.isInteger(rate)) {
			rate = rate.toFixed(2);
		}
		return `${rate} %`;
	};
	const addItem = () => {
		q.itemDesc.push("");
		q.itemPrice.push("");
		q.itemQty.push("");
		q = q;
	};
	const removeItem = () => {
		q.itemDesc.pop();
		q.itemPrice.pop();
		q.itemQty.pop();
		q = q;
	};

	onMount(() => {
		const s = new URLSearchParams(location.search);
		let obj = q;
		Object.keys(q).forEach((key) => {
			const values = s.getAll(key);
			if (values.length > 0) {
				if (Array.isArray(q[key])) {
					obj[key] = values;
					return;
				}
				obj[key] = values[0];
			}
		});
		q = {
			...data[q.lang].q,
			...obj,
		};
		if (!q.ref) {
			q.ref = Math.random().toString().slice(2, 8);
		}
		if (!q.date) {
			q.date = new Date().toJSON().slice(0, 10);
		}
	});

	$: l = {
		...data[q.lang].label[""],
		...data[q.lang].label[q.doc],
	};
	$: q.itemAmount = q.itemPrice.map((pr, index) => {
		const num = Number(pr) * Number(q.itemQty[index]);
		return num ? num : "";
	});
	$: q.totalAmount = q.itemAmount.reduce((a, b) => {
		const num = Number(a) + Number(b);
		return num ? num : "";
	}, 0);
	$: q.totalVat = Number(q.totalAmount) * Number(q.vatRate);
	$: q.totalWht = Number(q.totalAmount) * Number(q.whtRate);
	$: q.totalFinal =
		Number(q.totalAmount) +
		Number(q.totalVat) +
		Number(q.totalWht) +
		Number(q.totalAdjust);
</script>

<datalist id="desc-li">
	{#each data[q.lang].itemsDesc as str, index (`desc-li-${index}`)}
		<option value={str}>{str}</option>
	{/each}
</datalist>
<datalist id="unit-li">
	{#each data[q.lang].itemsUnit as str, index (`unit-li-${index}`)}
		<option value={str}>{str}</option>
	{/each}
</datalist>

<div class="flex flex-wrap justify-center items-center my-4 print:hidden">
	<div class="">
		{#each Object.keys(data) as str, index (`lang-${index}`)}
			<button
				class="p-3 font-bold text-lg {q.lang == str
					? 'text-indigo-500'
					: 'text-sky-500 underline'}"
				on:click={() => {
					q = data[str].q;
				}}
			>
				{data[str][""]}
			</button>
		{/each}
	</div>
	<div class="">
		{#each Object.keys(data[q.lang].label) as str, index (`doc-${index}`)}
			<button
				class="p-3 font-bold text-lg {q.doc == str
					? 'text-indigo-500'
					: 'text-sky-500 underline'}"
				on:click={() => {
					q.doc = str;
				}}
			>
				{data[q.lang].label[str].title}
			</button>
		{/each}
	</div>
</div>

<div class="container print:container-none mx-auto print:mx-0">
	<table class="w-full">
		<thead class="">
			<tr class="">
				<td
					class="text-center border-t border-x border-black"
					colspan="6"
					contenteditable="true"
					bind:textContent={q.vendorName}
				/>
			</tr>
			<tr class="">
				<td
					class="text-center border-x border-black"
					colspan="6"
					contenteditable="true"
					bind:textContent={q.vendorid}
				/>
			</tr>
			<tr class="">
				<td
					class="text-center border-b border-x border-black"
					colspan="6"
					contenteditable="true"
					bind:textContent={q.vendorAddress}
				/>
			</tr>
			<tr class="">
				<td
					class="text-center font-bold border border-black px-2 py-2"
					colspan="6">{l.title}</td
				>
			</tr>
			<tr class="">
				<td class="border-t border-x border-black px-2 pt-1" colspan="3">
					<span class="">{l.client}</span>:
					<span
						class=""
						contenteditable="true"
						bind:textContent={q.clientName}
					/>
				</td>
				<td class="border-t border-x border-black px-2 pt-1" colspan="3">
					<span class="">{l.date}</span>:
					<span class="hidden print:inline">{date(q.date)}</span>
					<input class="print:hidden" type="date" bind:value={q.date} />
				</td>
			</tr>
			<tr class="">
				<td
					class="border-x border-black px-2"
					colspan="3"
					contenteditable="true"
					bind:textContent={q.clientAddress}
				/>
				<td class="border-x border-black px-2" colspan="3">
					<span class="">{l.ref}</span>:
					<span class="" contenteditable="true" bind:textContent={q.ref} />
				</td>
			</tr>
			<tr class="">
				<td class="border-b border-x border-black px-2 pb-1" colspan="3">
					<span class="">{l.clientid}</span>
					<span class="" contenteditable="true" bind:textContent={q.clientid} />
				</td>
				<td class="border-b border-x border-black px-2 pb-1" colspan="3" />
			</tr>
			<tr class="text-center">
				<th class="border border-black px-2 py-1">{l.itemNo}</th>
				<th class="border border-black px-2 py-1 relative">{l.itemDesc}</th>
				<th class="border border-black px-2 py-1 w-20 print:w-auto"
					>{l.itemUnit}</th
				>
				<th class="border border-black px-2 py-1 w-14 print:w-auto"
					>{l.itemQty}</th
				>
				<th class="border border-black px-2 py-1 w-24 print:w-auto"
					>{l.itemPrice}</th
				>
				<th class="border border-black px-2 py-1 w-32 print:w-auto">
					<span class="">{l.itemAmount}</span>
					(<span
						class=""
						contenteditable="true"
						bind:textContent={q.currency}
					/>)
				</th>
			</tr>
		</thead>
		<tbody class="">
			{#each q.itemDesc as _, index (`item-${index}`)}
				<tr class="">
					<td
						class="border border-black text-center px-2 py-1"
						contenteditable="true">{index + 1}</td
					>
					<td class="border border-black px-2 py-1">
						<span class="hidden print:inline">{q.itemDesc[index]}</span>
						<input
							class="print:hidden w-full"
							type="text"
							bind:value={q.itemDesc[index]}
							list="desc-li"
						/>
					</td>
					<td class="border border-black text-center px-2 py-1">
						<span class="hidden print:inline">{q.itemUnit[index]}</span>
						<input
							class="print:hidden w-full"
							type="text"
							bind:value={q.itemUnit[index]}
							list="unit-li"
						/>
					</td>
					<td class="border border-black text-center px-2 py-1">
						<span class="hidden print:inline">{qty(q.itemQty[index])}</span>
						<input
							class="print:hidden w-full text-right"
							type="number"
							bind:value={q.itemQty[index]}
						/>
					</td>
					<td
						class="border border-black text-center print:text-right px-2 py-1"
					>
						<span class="hidden print:inline">{price(q.itemPrice[index])}</span>
						<input
							class="print:hidden w-full text-right"
							type="number"
							bind:value={q.itemPrice[index]}
						/>
					</td>
					<td class="border border-black text-right px-2 py-1"
						>{price(q.itemAmount[index])}</td
					>
				</tr>
			{/each}
			<tr class="print:hidden">
				<td class="text-center" colspan="6">
					<button
						class="text-lg underline font-bold text-sky-500 px-6 py-3"
						on:click={addItem}>{l.add}</button
					>
					<button
						class="text-lg underline font-bold text-sky-500 px-6 py-3"
						on:click={removeItem}>{l.delete}</button
					>
				</td>
			</tr>
		</tbody>
		<tfoot class="">
			<tr class="">
				<td
					class="border-l border-t border-black text-center"
					colspan="3"
					rowspan={2}
				>
					<span class="">{l.note}</span>:
					<span class="" contenteditable="true" bind:textContent={q.note} />
				</td>
				<td
					class="border border-black text-center px-2 py-1 font-bold"
					colspan="2">{l.totalAmount}</td
				>
				<td class="border border-black text-right px-2 py-1 font-bold">
					{price(q.totalAmount)}
				</td>
			</tr>
			<tr class="">
				<td
					class="border border-black text-center px-2 py-1 font-bold"
					colspan="2"
				>
					<span class="">{l.totalVat}</span>
					<span class="hidden print:inline">{rate(q.vatRate)}</span>
					<input
						class="print:hidden w-14"
						type="number"
						bind:value={q.vatRate}
						step="0.01"
					/>
				</td>
				<td class="border border-black text-right px-2 py-1 font-bold">
					{price(q.totalVat)}
				</td>
			</tr>
			{#if q.doc == "receipt"}
				<tr class="">
					<td class="border-l border-black" colspan="3" />
					<td
						class="border border-black text-center px-2 py-1 font-bold"
						colspan="2"
					>
						<span class="">{l.totalWht}</span>
						<span class="hidden print:inline">{rate(q.whtRate)}</span>
						<input
							class="print:hidden w-14"
							type="number"
							bind:value={q.whtRate}
							step="0.01"
						/>
					</td>
					<td class="border border-black text-right px-2 py-1 font-bold">
						{price(q.totalWht)}
					</td>
				</tr>
			{/if}
			<tr class="">
				<td class="border-l border-black" colspan="3" />
				<td
					class="border border-black text-center px-2 py-1 font-bold"
					colspan="2">{l.totalAdjust}</td
				>
				<td class="border border-black text-right px-2 py-1 font-bold">
					<span class="hidden print:inline">{price(q.totalAdjust)}</span>
					<input
						class="print:hidden w-full"
						type="number"
						bind:value={q.totalAdjust}
					/>
				</td>
			</tr>
			<tr class="">
				<td class="border-l border-black" colspan="3" />
				<td
					class="border border-black text-center px-2 py-1 font-bold"
					colspan="2">{l.totalFinal}</td
				>
				<td class="border border-black text-right px-2 py-1 font-bold">
					{price(q.totalFinal)}
				</td>
			</tr>
			<tr class="text-center">
				<td class="border border-black" colspan="3" contenteditable="true">
					<br /><br /><br />
				</td>
				<td class="border border-black" colspan="3" contenteditable="true">
					<br /><br /><br />
				</td>
			</tr>
			<tr class="text-center">
				<td class="border border-black" colspan="3">{l.vendorSign}</td>
				<td class="border border-black" colspan="3">{l.clientSign}</td>
			</tr>
		</tfoot>
	</table>
</div>

<div class="flex flex-wrap justify-center items-center my-4 print:hidden gap-4">
	<button
		class="p-3 font-bold text-sky-500 underline text-lg"
		on:click={() => {
			print();
		}}
	>
		{l.print}
	</button>
</div>
