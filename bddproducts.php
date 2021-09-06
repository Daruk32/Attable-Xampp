<!DOCTYPE html>
<html lang="en">

	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		
		<title>JTable</title>

		<link rel="stylesheet" href="css\booststrap.css">
		<link rel="stylesheet" href="css\footer.css">

		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">

 
		<!-- Bootstrap core JS-->
		<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
		<script src="https://unpkg.com/tableexport.jquery.plugin/tableExport.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>

		
		<!-- icons-->
		<script src="https://use.fontawesome.com/2e4ae48f29.js"></script>
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
		
		<!-- Bootstrap Table Style -->
		<link rel="stylesheet" href="https://unpkg.com/bootstrap-table@1.18.3/dist/bootstrap-table.min.css">

		<script src="js\valid.js" type="text/javascript"></script>

		<script src="js/cookie.js" type="text/javascript"></script>

		<script src="js/panier.js" type="module"></script>

		<script src="https://unpkg.com/bootstrap-table@1.18.3/dist/bootstrap-table.min.js"></script>
		<script src="https://unpkg.com/bootstrap-table@1.18.3/dist/bootstrap-table-locale-all.min.js"></script>
		<script src="https://unpkg.com/bootstrap-table@1.18.3/dist/extensions/export/bootstrap-table-export.min.js"></script>
		<script src="https://unpkg.com/bootstrap-table@1.18.3/dist/extensions/print/bootstrap-table-print.min.js"></script>

		<script src="js/data.js" type="module"></script>

	</head>
	
	<body>
	
		<section>
			<nav class="navbar navbar-expand-lg navbar-light" id="top">
				<div class="container-fluid d-flex flex-row">
					<a class="navbar-brand" href="index.html" id="logo"><img src="images\attable_logo2.png" class="img-fluid" alt="monlogo" id="lelogo"></a>
					<div id="titre_page" class="collapse navbar-collapse justify-content-center">
						<div id="titre_page">Passez ATTABLE et faites des économies !</div>
					</div>
					<div class='nav-item collapse navbar-collapse'>
						<form class="collapse navbar-collapse justify-content-end">
							<input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
							<button class="btn btn-outline-success" type="submit">Search</button>
						</form>
					</div>
					<div id="authentification">
						<a href="authentification.html">
						<img src="images\login.png" alt="Authentification" id="lesids">
						</a>				
					</div>						
					<div id="panier">
						<a href="panier.html">
							<span id="total_articles">0</span>
							<img src="images\logo_panier2.png" alt="MonPanier" id="lepanier">
							<span id="total_commande">0 €</span>
						</a>
					</div>
				</div>
			</nav>			  
		</section>


		<div class="select">
			<select class="form-control" id="locale">
				<option value="en-US">en-US</option>
				<option value="fr-FR" selected>fr-FR</option>
			</select>
		</div>


		<div id="toolbar">
			<button id="remove" class="btn btn-danger" disabled>
				<i class="fa fa-trash"></i> Delete
			</button>
		</div>
		<table
		id="table"
		data-toolbar="#toolbar"
		data-search="true"
		data-show-refresh="true"
		data-show-toggle="true"
		data-show-print="true"
		data-show-fullscreen="true"
		data-show-columns="true"
		data-show-columns-toggle-all="true"
		data-detail-view="true"
		data-show-export="true"
		data-click-to-select="true"
		data-detail-formatter="detailFormatter"
		data-minimum-count-columns="2"
		data-show-pagination-switch="true"
		data-pagination="true"
		data-id-field="id"
		data-page-list="[10, 25, 50, 100, all]"
		data-show-footer="true"
		data-side-pagination="server"
		data-url="bddproducts.json"
		data-response-handler="responseHandler">
		</table>




		<footer class="py-4 text-center">
			<div class="container">
				<div class="row">
					<div class="col-sm-4 links" id="menu">
						<ul id="menus">
							<li><a href="index.html">Accueil</a></li>
							<li><a href="quisommesnous.html">Qui sommes nous</a></li>
							<li><a href="noustrouver.html">Nous trouver</a></li>
							<li><a href="panier.html">Commande</a></li>
						</ul>
					</div>

					<div class="col-sm-4 text-center ancre">
						<a href="#top">
							<i id='icon-footer' class="fas fa-angle-up"></i>
						</a>
						<p class="m-0 text-center text-white">Copyright &copy; ATTABLE 2021</p>
					</div>

					<div class="col-sm-4 links" id="menu">
						<ul id="menus">
							<li><a href="newsletter.html">Mailing List</a></li>
							<li><a href="mentionslegales.html">Mentions légales</a></li>
							<li><a href="cgu.html">CGU</a></li>
						</ul>
					</div>
				</div>			
			</div>
        </footer>

		
		<script>
		var $table = $('#table')
		var $remove = $('#remove')
		var selections = []

		function getIdSelections() {
			return $.map($table.bootstrapTable('getSelections'), function (row) {
			return row.id
			})
		}

		function responseHandler(res) {
			$.each(res.rows, function (i, row) {
			row.state = $.inArray(row.id, selections) !== -1
			})
			return res
		}

		function detailFormatter(index, row) {
			var html = []
			$.each(row, function (key, value) {
			html.push('<p><b>' + key + ':</b> ' + value + '</p>')
			})
			return html.join('')
		}

		function operateFormatter(value, row, index) {
			return [
			'<a class="like" href="javascript:void(0)" title="Like">',
			'<i class="fa fa-heart"></i>',
			'</a>  ',
			'<a class="remove" href="javascript:void(0)" title="Remove">',
			'<i class="fa fa-trash"></i>',
			'</a>'
			].join('')
		}

		window.operateEvents = {
			'click .like': function (e, value, row, index) {
			alert('You click like action, row: ' + JSON.stringify(row))
			},
			'click .remove': function (e, value, row, index) {
			$table.bootstrapTable('remove', {
				field: 'id',
				values: [row.id]
			})
			}
		}

		function totalTextFormatter(data) {
			return 'Total'
		}

		function totalNameFormatter(data) {
			return data.length
		}



		function initTable() {
			$table.bootstrapTable('destroy').bootstrapTable({
			height: 550,
			locale: $('#locale').val(),
			columns: [
				[{
				field: 'state',
				checkbox: true,
				rowspan: 2,
				align: 'center',
				valign: 'middle'
				}, {
				title: 'Référence',
				field: 'id',
				rowspan: 2,
				align: 'center',
				valign: 'middle',
				sortable: true,
				footerFormatter: totalTextFormatter
				}, {
				title: 'Item Detail',
				colspan: 4,
				align: 'center'
				}],
				[{
				field: 'libelle',
				title: 'Nom',
				sortable: true,
				footerFormatter: totalNameFormatter,
				align: 'center'
				}, {
				field: 'prix',
				title: 'Prix',
				sortable: true,
				align: 'center',
				}, {
				field: 'quantity',
				title: 'Quantité',
				sortable: true,
				align: 'center',
				}, {
				field: 'operate',
				title: 'Item Operate',
				align: 'center',
				clickToSelect: false,
				events: window.operateEvents,
				formatter: operateFormatter
				}]
			]
			})
			$table.on('check.bs.table uncheck.bs.table ' +
			'check-all.bs.table uncheck-all.bs.table',
			function () {
			$remove.prop('disabled', !$table.bootstrapTable('getSelections').length)

			// save your data, here just save the current page
			selections = getIdSelections()
			// push or splice the selections if you want to save all data selections
			})
			$table.on('all.bs.table', function (e, name, args) {
			console.log(name, args)
			})
			$remove.click(function () {
			var ids = getIdSelections()
			$table.bootstrapTable('remove', {
				field: 'id',
				values: ids
			})
			$remove.prop('disabled', true)
			})
		}

		$(function() {
			initTable()

			$('#locale').change(initTable)
		})
		</script>

	</body>
</html>