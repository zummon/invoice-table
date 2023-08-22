<script>
	import { onMount } from "svelte";
	import data from "./data.json";

	let l = data[""].label[""];
	let q = data[""].q;

	const price = number => {
		number = Number(number);
		if (number == 0 || isNaN(number)) {
			return "";
		}
		return number.toLocaleString(undefined, {
			minimumFractionDigits: 2,
		});
	};
	const qty = number => {
		number = Number(number);
		if (number == 0 || isNaN(number)) {
			return "";
		}
		return number.toLocaleString(undefined, {
			minimumFractionDigits: 0,
		});
	};
	const rate = rate => {
		rate = Number(rate) * 100;
		if (!Number.isInteger(rate)) {
			rate = rate.toFixed(2);
		}
		return `${rate} %`;
	};
	const addItem = () => {
		q.itemDesc.push('');
		q.itemPrice.push('');
		q.itemQty.push('');
		q = q;
	};
	const removeItem = () => {
		q.itemDesc.pop();
		q.itemPrice.pop();
		q.itemQty.pop();
		q = q;
	};

	// "ref": Math.random().toString().slice(2, 8),
	// "date": new Date().toLocaleDateString(undefined),

	// "ref": Math.random().toString().slice(2, 8),
	// "date": new Date().toLocaleDateString("th",{ year: 'numeric', month: 'long', day: 'numeric' }),

	onMount(() => {
		const s = new URLSearchParams(location.search);
		let obj = q;
		Object.keys(q).forEach(key => {
			const values = s.getAll(key);
			if (values.length > 0) {
			if (Array.isArray(q[key])) {
				obj[key] = values;
				return;
			}
			obj[key] = values[0];
			}
		});
		q = { ...data[q.lang].q, ...obj };
		
	});

	$: l = {
		...data[q.lang].label[""],
		...data[q.lang].label[q.doc]
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
	{#each data[q.lang].itemsDesc as item, index (`desc-li-${index}`)}
		<option value={item}>{item}</option>
	{/each}
</datalist>
<datalist id="unit-li">
	{#each data[q.lang].itemsUnit as item, index (`unit-li-${index}`)}
		<option value={item}>{item}</option>
	{/each}
</datalist>

<div class="flex flex-wrap justify-center items-center my-4 print:hidden">
	<div class="">
		{#each Object.keys(data) as lng, index (`lang-${index}`)}
			<button class="p-3 font-bold {q.lang == lng ? "text-indigo-500" : "text-sky-500 underline"}" on:click={() => {
				q = data[lng].q
			}}>
				{data[lng]['']}
			</button>
		{/each}
	</div>
	<div class="">
		{#each Object.keys(data[q.lang].label) as dc, index (`doc-${index}`)}
			<button class="p-3 font-bold {q.doc == dc ? "text-indigo-500" : "text-sky-500 underline"}" on:click={() => {
				q.doc = dc
			}}>
				{data[q.lang].label[dc].title}
			</button>
		{/each}
	</div>
</div>

<div class="container print:container-none mx-auto print:mx-0">
	<table class="w-full">
		<thead class="">
			<tr class="">
				<td class="text-center border-t border-x border-black" colspan="6" contenteditable="true" bind:textContent={q.vendorName}></td>
			</tr>
			<tr class="">
				<td class="text-center border-x border-black" colspan="6" contenteditable="true" bind:textContent={q.vendorid}></td>
			</tr>
			<tr class="">
				<td class="text-center border-b border-x border-black" colspan="6" contenteditable="true" bind:textContent={q.vendorAddress}></td>
			</tr>
			<tr class="">
				<td class="text-center font-bold border border-black px-2 py-2" colspan="6">{l.title}</td>
			</tr>
			<tr class="">
				<td class="border-t border-x border-black px-2 pt-1" colspan="3">
					<span class="">{l.client}</span>: <span class="" contenteditable="true" bind:textContent={q.clientName}></span>
				</td>
				<td class="border-t border-x border-black px-2 pt-1" colspan="3">
					<span class="">{l.date}</span>: <span class="" contenteditable="true" bind:textContent={q.date}></span>
				</td>
			</tr>
			<tr class="">
				<td class="border-x border-black px-2" colspan="3" contenteditable="true" bind:textContent={q.clientAddress}></td>
				<td class="border-x border-black px-2" colspan="3">
					<span class="">{l.ref}</span>: <span class="" contenteditable="true" bind:textContent={q.ref}></span>
				</td>
			</tr>
			<tr class="">
				<td class="border-b border-x border-black px-2 pb-1" colspan="3">
					<span class="">{l.clientid}</span> <span class="" contenteditable="true" bind:textContent={q.clientid}></span>
				</td>
				<td class="border-b border-x border-black px-2 pb-1" colspan="3"></td>
			</tr>
			<tr class="text-center">
				<th class="border border-black px-2 py-1">{l.itemNo}</th>
				<th class="border border-black px-2 py-1 relative">
					<span class="">{l.itemDesc}</span>
				</th>
				<th class="border border-black px-2 py-1">{l.itemUnit}</th>
				<th class="border border-black px-2 py-1">{l.itemQty}</th>
				<th class="border border-black px-2 py-1">{l.itemPrice}</th>
				<th class="border border-black px-2 py-1">
					<span class="">{l.itemAmount}</span>
					(<span class="" contenteditable="true" bind:textContent={q.currency}></span>)
				</th>
			</tr>
		</thead>
		<tbody class="">
			{#each q.itemDesc as _, index (`item-${index}`)}
				<tr class="">
					<td class="border border-black text-center px-2 py-1" contenteditable="true">{index + 1}</td>
					<td class="border border-black px-2 py-1" >
						<span class="hidden print:inline">{q.itemDesc[index]}</span>
						<input class="print:hidden" type="text" bind:value={q.itemDesc[index]} list="desc-li" />
					</td>
					<td class="border border-black text-center px-2 py-1">
						<span class="hidden print:inline">{q.itemUnit[index]}</span>
						<input class="print:hidden w-12" type="text" bind:value={q.itemUnit[index]} list="unit-li" />
					</td>
					<td class="border border-black text-center px-2 py-1" >
						<span class="hidden print:inline">{qty(q.itemQty[index])}</span>
						<input class="print:hidden w-12" type="number" bind:value={q.itemQty[index]} />
					</td>
					<td class="border border-black text-right px-2 py-1" >
						<span class="hidden print:inline">{price(q.itemPrice[index])}</span>
						<input class="print:hidden w-12" type="number" bind:value={q.itemPrice[index]} />
					</td>
					<td class="border border-black text-right px-2 py-1">{price(q.itemAmount[index])}</td>
				</tr>
			{/each}
		</tbody>
		<tfoot class="">
			<tr class="">
				<td class="border-l border-t border-black text-center" colspan="3" rowspan={2}>
					<button class="text-4xl font-bold text-sky-500 p-2 print:hidden" on:click={addItem}>+</button>
					<button class="text-4xl font-bold text-sky-500 p-2 print:hidden" on:click={removeItem}>-</button>
				</td>
				<td class="border border-black text-center px-2 py-1 font-bold" colspan="2">{l.totalAmount}</td>
				<td class="border border-black text-right px-2 py-1 font-bold">
					{price(q.totalAmount)}
				</td>
			</tr>
			<tr class="">
				<td class="border border-black text-center px-2 py-1 font-bold" colspan="2">
					<span class="">{l.totalVat}</span>
					<span class="hidden print:inline">{rate(q.vatRate)}</span>
					<input class="print:hidden w-12" type="number" bind:value={q.vatRate} step="0.01" />
				</td>
				<td class="border border-black text-right px-2 py-1 font-bold">
					{price(q.totalVat)}
				</td>
			</tr>
			{#if q.doc == 'receipt'}
				<tr class="">
					<td class="border-l border-black" colspan="3"></td>
					<td class="border border-black text-center px-2 py-1 font-bold" colspan="2">
						<span class="">{l.totalWht}</span>
						<span class="hidden print:inline">{rate(q.whtRate)}</span>
						<input class="print:hidden w-12" type="number" bind:value={q.whtRate} step="0.01" />
					</td>
					<td class="border border-black text-right px-2 py-1 font-bold">
						{price(q.totalWht)}
					</td>
				</tr>
			{/if}
			<tr class="">
				<td class="border-l border-black" colspan="3"></td>
				<td class="border border-black text-center px-2 py-1 font-bold" colspan="2">{l.totalAdjust}</td>
				<td class="border border-black text-right px-2 py-1 font-bold" >
					<span class="hidden print:inline">{price(q.totalAdjust)}</span>
					<input class="print:hidden w-12" type="number" bind:value={q.totalAdjust} />
				</td>
			</tr>
			<tr class="">
				<td class="border-l border-black" colspan="3"></td>
				<td class="border border-black text-center px-2 py-1 font-bold" colspan="2">{l.totalFinal}</td>
				<td class="border border-black text-right px-2 py-1 font-bold">
					{price(q.totalFinal)}
				</td>
			</tr>
			<tr class="text-center">
				<td class="border border-black" colspan="3" contenteditable="true">
					<br><br><br>
				</td>
				<td class="border border-black" colspan="3" contenteditable="true">
					<br><br><br>
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
	<button class="p-3 font-bold text-sky-500 underline" on:click={() => {print()}}>
		{l.print}
	</button>
</div>