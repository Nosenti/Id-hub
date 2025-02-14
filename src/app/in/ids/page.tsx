import React from 'react';
import getAllIdsFromDb from "@/lib/id-queries"

export default async function page() {
	const ids = await getAllIdsFromDb();
	console.log(ids);
  return (
	<div>
		  {
			  ids.map((el, index) => {
				  return <p key={index}>{ el.id_number}</p>
			  })
	  }
	</div>
  )
}
