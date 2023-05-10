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
	  return `${q.currency} ${number.toLocaleString(undefined, {
	    minimumFractionDigits: 2,
	    maximumFractionDigits: 2
	  })}`;
	};
	const qty = number => {
	  number = Number(number);
	  if (number === 0 || isNaN(number)) {
	    return "";
	  }
	  return number;
	};
	const rate = rate => {
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
	$: q.itemAmount = q.itemPrice.map((pr, i) => {
	  const num = Number(pr) * Number(q.itemQty[i]);
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
		{#each Object.keys(data) as lng, i (`lang-${i}`)}
			<button class="p-3 font-bold {q.lang === lng ? "text-indigo-500" : "text-sky-500 underline"}" on:click={() => {
				q.lang = lng
			}}>
				{data[lng]['']}
			</button>
		{/each}
	</div>
	<div class="">
		{#each Object.keys(data[q.lang].label) as dc, i (`doc-${i}`)}
			<button class="p-3 font-bold {q.doc === dc ? "text-indigo-500" : "text-sky-500 underline"}" on:click={() => {
				q.doc = dc
			}}>
				{data[q.lang].label[dc].title}
			</button>
		{/each}
	</div>
</div>

<div class="">
    <table class="table-auto w-full">
        <thead class="text-center">
			<tr class="">
				<td class="" colspan="6" contenteditable="true" bind:textContent={q['vendorName']}></td>
			</tr>
			<tr class="">
				<td class="" colspan="6" contenteditable="true" bind:textContent={q['vendorId']}></td>
			</tr>
			<tr class="">
				<td class="" colspan="6" contenteditable="true" bind:textContent={q['vendorAddress']}></td>
			</tr>
            <tr class="">
                <th class="font-bold" colspan="6">{l['title']}</th>
            </tr>
			<tr class="text-center">
                <td class="">{l['itemNo']}</td>
                <td class="">{l['itemDesc']}</td>
                <td class=""></td>
                <td class="">{l['itemQty']}</td>
                <td class="">{l['itemPrice']}</td>
                <td class="">{l['itemAmount']}</td>
            </tr>
        </thead>
        <tbody class="">
            <tr class="">
                <td class=""></td>
                <td class=""></td>
                <td class=""></td>
                <td class=""></td>
                <td class=""></td>
                <td class=""></td>
            </tr>
        </tbody>
		<tfoot class="">
			<tr class="">
				<td class=""></td>
				<td class=""></td>
				<td class=""></td>
				<td class=""></td>
				<td class="">{l['totalAmount']}</td>
				<td class=""></td>
			</tr>
			<tr class="">
				<td class=""></td>
				<td class=""></td>
				<td class=""></td>
				<td class=""></td>
				<td class=""></td>
				<td class=""></td>
			</tr>
			<tr class="text-center">
				<td class="" colspan="3" contenteditable="true"></td>
				<td class="" colspan="3" contenteditable="true"></td>
			</tr>
			<tr class="text-center">
				<td class="" colspan="3">{l['vendorSign']}</td>
				<td class="" colspan="3">{l['clientSign']}</td>
			</tr>
		</tfoot>
    </table>
</div>


<div class="flex flex-wrap justify-center items-center my-4 print:hidden">
	<button class="p-3 font-bold text-sky-500 underline" on:click={() => window.print()}>
		Print
	</button>
</div>

