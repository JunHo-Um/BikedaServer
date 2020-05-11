// Call the dataTables jQuery plugin
$(document).ready(function() {
  $('#dataTable').DataTable({
	filter	: false,
	paging	: false,
  ordering	: false
  });

  $('#strDate').datepicker({
      format          : "yyyy-mm-dd",
      language        : "kr",
      todayHighlight  : true,
      todayBtn        : 'linked'
  });

  $('#endDate').datepicker({
      format          : "yyyy-mm-dd",
      language        : "kr",
      todayHighlight  : true,
      todayBtn        : 'linked'
  });

});
