<!-- Cart table -->
<table class="ecart-products" id="eCart">
	<thead>
		<tr>
			<th class="ecart-remove"></th>
			<th class="ecart-image">image</th>
			<th class="ecart-name">name</th>
			<th class="ecart-quantity">quantity</th>
			<th class="ecart-price">price</th>
		</tr>
	</thead>
	<tbody></tbody>
	<tfoot>
		<tr style="display: none;">
			<td colspan="4">Subtotal</td>
			<td><span id="eSubtotal">0</span></td>
		</tr>
		<tr style="display: none;">
			<td colspan="4">Shipping</td>
			<td><span id="eShipping">0</span></td>
		</tr>
		<tr>
			<td colspan="4"><b>Total, $</b></td>
			<td><span id="eTotal">0</span></td>
		</tr>
		<tr>
			<td colspan="5">
				<a id="eUpdate" class="btn btn--revenue">update cart</a>
			</td>
		</tr>
	</tfoot>
</table>