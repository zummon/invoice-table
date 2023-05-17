<script>
	import { onMount } from "svelte";
	export let data;

	let l = data[""].label[""];
	let q = data[""].q;

	const price = number => {
		number = Number(number);
		if (number === 0 || isNaN(number)) {
			return "";
		}
		return number.toLocaleString(undefined, {
			minimumFractionDigits: 2,
		});
	};
	const qty = number => {
		number = Number(number);
		if (number === 0 || isNaN(number)) {
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

<div class="flex flex-wrap justify-center items-center my-4 print:hidden">
	<div class="">
		{#each Object.keys(data) as lng, index (`lang-${index}`)}
			<button class="p-3 font-bold {q.lang === lng ? "text-indigo-500" : "text-sky-500 underline"}" on:click={() => {
				q.lang = lng
			}}>
				{data[lng]['']}
			</button>
		{/each}
	</div>
	<div class="">
		{#each Object.keys(data[q.lang].label) as dc, index (`doc-${index}`)}
			<button class="p-3 font-bold {q.doc === dc ? "text-indigo-500" : "text-sky-500 underline"}" on:click={() => {
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
					<td class="border border-black px-2 py-1" contenteditable="true" bind:textContent={q.itemDesc[index]}></td>
					<td class="border border-black text-center px-2 py-1" contenteditable="true" bind:textContent={q.itemUnit[index]}></td>
					<td class="border border-black text-center px-2 py-1" contenteditable="true" 
						on:focus={(e) => {e.target.textContent = q.itemQty[index]}}
						on:input={(e) => {q.itemQty[index] = e.target.textContent}}
						on:blur={(e) => {e.target.textContent = qty(q.itemQty[index])}}
					>
						{qty(q.itemQty[index])}
					</td>
					<td class="border border-black text-right px-2 py-1" contenteditable="true" 
						on:focus={(e) => {e.target.textContent = q.itemPrice[index]}}
						on:input={(e) => {q.itemPrice[index] = e.target.textContent}}
						on:blur={(e) => {e.target.textContent = price(q.itemPrice[index])}}
					>
						{price(q.itemPrice[index])}
					</td>
					<td class="border border-black text-right px-2 py-1">{price(q.itemAmount[index])}</td>
				</tr>
			{/each}
			<tr class="print:hidden">
				<td class="text-center"></td>
				<td class="text-center">
					{#each data[q.lang].itemsDesc as item, index (`desc-list-${index}`)}
						<button class="inline text-sky-500 font-medium" on:click={(event) => {
							let items = q.itemDesc.slice()
							for (let index = 0; index < items.length; index++) {
								if (items[index] == '') {
									q.itemDesc[index] = item
									break
								}
							}
						}}>
							{item}
						</button>
					{/each}
				</td>
				<td class="text-center">
					{#each data[q.lang].itemsUnit as item, index (`unit-list-${index}`)}
						<button class="inline text-sky-500 font-medium" on:click={(event) => {
							let items = q.itemUnit.slice()
							for (let index = 0; index < items.length; index++) {
								if (items[index] == '') {
									q.itemUnit[index] = item
									break
								}
							}
						}}>
							{item}
						</button>
					{/each}
				</td>
				<td class="text-center"></td>
				<td class="text-center"></td>
				<td class="text-center">
					<button class="text-4xl font-bold text-sky-500 p-2" on:click={addItem}>+</button>
					<button class="text-4xl font-bold text-sky-500 p-2" on:click={removeItem}>-</button>
				</td>
			</tr>
		</tbody>
		<tfoot class="">
			<tr class="">
				<td class="border-l border-t border-black" colspan="3"></td>
				<td class="border border-black text-center px-2 py-1 font-bold" colspan="2">{l.totalAmount}</td>
				<td class="border border-black text-right px-2 py-1 font-bold">
					{price(q.totalAmount)}
				</td>
			</tr>
			<tr class="">
				<td class="border-l border-black" colspan="3"></td>
				<td class="border border-black text-center px-2 py-1 font-bold" colspan="2">
					<span class="">{l.totalVat}</span>
					<span class="" contenteditable="true" 
						on:focus={(e) => {e.target.textContent = q.vatRate}}
						on:input={(e) => {q.vatRate = e.target.textContent}}
						on:blur={(e) => {e.target.textContent = rate(q.vatRate)}}
					>
						{rate(q.vatRate)}
					</span>
				</td>
				<td class="border border-black text-right px-2 py-1 font-bold">
					{price(q.totalVat)}
				</td>
			</tr>
			{#if q.doc === 'receipt'}
				<tr class="">
					<td class="border-l border-black" colspan="3"></td>
					<td class="border border-black text-center px-2 py-1 font-bold" colspan="2">
						<span class="">{l.totalWht}</span>
						<span class="" contenteditable="true" 
							on:focus={(e) => {e.target.textContent = q.whtRate}}
							on:input={(e) => {q.whtRate = e.target.textContent}}
							on:blur={(e) => {e.target.textContent = rate(q.whtRate)}}
						>
							{rate(q.whtRate)}
						</span>
					</td>
					<td class="border border-black text-right px-2 py-1 font-bold">
						{price(q.totalWht)}
					</td>
				</tr>
			{/if}
			<tr class="">
				<td class="border-l border-black" colspan="3"></td>
				<td class="border border-black text-center px-2 py-1 font-bold" colspan="2">{l.totalAdjust}</td>
				<td class="border border-black text-right px-2 py-1 font-bold" contenteditable="true" 
					on:focus={(e) => {e.target.textContent = q.totalAdjust}}
					on:input={(e) => {q.totalAdjust = e.target.textContent}}
					on:blur={(e) => {e.target.textContent = price(q.totalAdjust)}}
				>
					{price(q.totalAdjust)}
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
	<button class="p-3 font-bold text-sky-500 underline" on:click={() => {window.print()}}>
		Print
	</button>
</div>